import express from "express";

import userController from "../controller/user-controller"

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send('Hello from Express + Prisma! Testing');
});

publicRouter.get('/api/users', userController.get);
publicRouter.post('/api/users', userController.create);
publicRouter.put('/api/users/:userId', userController.update);
publicRouter.delete('/api/users/:userId', userController.remove);

export {
    publicRouter
}
