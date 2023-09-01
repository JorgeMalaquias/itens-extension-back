import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import sanitizedConfig from "../config";
import { userPayloadSchema } from "../schema/userSchema";

export async function validateToken(req:Request, res:Response, next:NextFunction) {
    const { authorization } = req.headers;
    if(!(typeof authorization === 'string' && authorization.includes("Bearer "))){
        throw ({ name: 'unauthorized', message: 'auth failed' });
    }
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        throw ({ name: 'unauthorized', message: 'auth failed' });
    }
    const data = jwt.verify(token, sanitizedConfig.JWT_SECRET);
    if (userPayloadSchema.validate(data,{abortEarly:false}).value) {
        res.locals.userId = userPayloadSchema.validate(data,{abortEarly:false}).value.id;
        next();
    }else{
        throw ({ name: 'unauthorized', message: 'auth failed' });
    }
}