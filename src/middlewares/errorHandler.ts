import { Request,Response,NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ApplicationError } from "../types";

export function errorHandler(err:ApplicationError | JsonWebTokenError, req:Request, res:Response, next:NextFunction) {
    if (err.name) {
        return res.status(errorTypeToStatusCode(err.name)).send(err.message);
    }

    return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType:string) {
    if (errorType === 'conflict') return 409;
    if (errorType === 'not_found') return 404;
    if (errorType === 'unauthorized') return 401;
    if (errorType === 'bad_request') return 400;

    return 400;
}