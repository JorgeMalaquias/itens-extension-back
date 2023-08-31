import { Request, Response } from 'express';
import userService from '../services/userService';


async function login(req:Request,res:Response){
    const token = await userService.login(req.body);
    res.status(200).send(token);
}

async function register(req:Request,res:Response){
    await userService.register(req.body);
    res.status(201).send("user registered successfully!");
}

const userController = {
    login,
    register
}

export default userController;