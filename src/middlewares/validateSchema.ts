import { Request, Response, NextFunction } from "express";
import joi from "joi";
import { ItemDataEntry } from "../types";

export function validateSchema(schema:joi.ObjectSchema<ItemDataEntry>) {
    return (req:Request, res:Response, next:NextFunction) => { 
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        throw ({type:error.name,message:error.message});
      }
      console.log("validateschema");
      next();
    }
}