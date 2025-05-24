import { validate } from "../validation/_validation";
// import {  } from "../validation/"
import { createUserValidation, updateUserValidation, removeUserValidation } from "../validation/user-validation"
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

type GetType = {
    search: string,
    page: number,
    size: number
}

// const getProfile = async (id: string) => {
//     username = validate(getUserValidation, username);

//     const user = await prismaClient.user.findFirst({
//         where: {
//             username: username
//         },
//         select: {
//             id: true,
//             username: true,
//             name: true
//         }
//     });

//     if(!user){
//         throw new ResponseError(404, "User is not found");
//     }

//     return user;
// }

const getList = async (request: GetType) => {

    const skip = (request.page - 1) * request.size;

    const filters = [
        {
            name: {
                contains: request.search
            }
        }
    ];

    let users = await prismaClient.user.findMany({
        // where: {
        //     OR: filters
        // },
        take: request.size,
        skip: skip,
        // select: {
        //     id: true,
        //     username: true,
        //     name: true,
        // },
    });

    const totalItems = await prismaClient.user.count({
        // where: {
        //     OR: filters
        // }
    });

    return {
        data: users,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems/request.size)
        }
    }
}

const create = async (request: Request) => {
    const user = validate(createUserValidation, request);

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    });
}

const update = async (request: Request) => {
    const user = validate(updateUserValidation, request);

    const userCount = await prismaClient.user.count({
        where: {
            id: user.id
        }
    });

    if(userCount !== 1){
        throw new ResponseError(404, "User is not found");
    }

    return prismaClient.user.update({
        where: {
            id: user.id
        },
        data: {
            name: user.name,
            email: user.email,
            role: user.role
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    });
}

const remove = async (userId: string) => {
    userId = validate(removeUserValidation, userId);

    const contactCount = await prismaClient.user.count({
        where: {
            id: userId
        }
    });

    if(contactCount !== 1){
        throw new ResponseError(404, "User is not found");
    }

    return prismaClient.user.delete({
        where: {
            id: userId
        }
    });
}

export default {
    getList,
    create,
    update,
    remove
}
