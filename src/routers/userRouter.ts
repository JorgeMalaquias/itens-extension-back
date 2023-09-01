import { Router } from "express";
import userController from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schema/userSchema";


const userRouter = Router();

userRouter.post('/users', validateSchema(userSchema), userController.register);
userRouter.post('/users/auth', validateSchema(userSchema), userController.login);

export default userRouter;