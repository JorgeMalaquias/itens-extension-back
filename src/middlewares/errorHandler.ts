import { Request,Response,NextFunction } from "express";
import { ApplicationError } from "../types";

export function errorHandler(err:ApplicationError, req:Request, res:Response, next:NextFunction) {
    if (err.type) {
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }

    return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType:string) {
    if (errorType === 'conflict') return 409;
    if (errorType === 'not_found') return 404;
    if (errorType === 'unauthorized') return 401;

    return 400;
}