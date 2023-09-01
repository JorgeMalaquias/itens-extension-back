import joi from 'joi';
import {  UserDataEntry } from '../types';


export const userSchema = joi.object<UserDataEntry>({
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
});

export const userPayloadSchema = joi.object({
    id: joi.number().required()
});