import express from "express";

import userController from "../controller/user-controller"

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send('Hello from Express + Prisma! Testing');
});

publicRouter.get('/api/users', userController.get);

export {
    publicRouter
}
