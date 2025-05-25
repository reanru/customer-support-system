import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { ResponseError } from "../_class/ResponseError";
import { validate } from "../validation/_validation";
import { loginValidation } from "../validation/auth-validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const generateAdmin = async () => {
    return prismaClient.user.create({
        data: {
            name: 'Superadmin',
            email: 'superadmin@gmail.com',
            password: await bcrypt.hash('superadmin123', 10),
            role: 'ADMIN'
        },
        select: {
            email: true,
            name: true,
            role: true
        }
    });
}

const login = async (request: Request) => {
    const loginRequest = validate(loginValidation, request);

    const user = await prismaClient.user.findFirst({
        where: {
            email: loginRequest.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true
        }
    });
    
    if(!user){
        throw new ResponseError(401, "Email or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password ?? '');

    if(!isPasswordValid){
        throw new ResponseError(401, "Email or password wrong");
    }

    const expiresIn = 60*60*1;

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY!, {expiresIn: expiresIn});

    return {
        token: token
    }

    // return prismaClient.user.update({
    //     data: {
    //         token: token
    //     },
    //     where: {
    //         id: user.id
    //     },
    //     select: {
    //         token: true
    //     }
    // });
}

export default {
    generateAdmin,
    login,
}