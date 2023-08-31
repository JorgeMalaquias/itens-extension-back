import { Router } from "express";
import userController from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";


const userRouter = Router();

userRouter.post('/users',userController.register);
userRouter.post('/users/auth',userController.login);

export default userRouter;