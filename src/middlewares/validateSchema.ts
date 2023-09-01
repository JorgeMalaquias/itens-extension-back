import { Request, Response, NextFunction } from "express";
import joi from "joi";

export function validateSchema(schema:joi.ObjectSchema) {
    return (req:Request, res:Response, next:NextFunction) => { 
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        throw ({name:error.name,message:error.message});
      }
      next();
    }
}