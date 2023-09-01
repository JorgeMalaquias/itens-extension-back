import joi from 'joi';
import {  UserDataEntry } from '../types';


export const userSchema = joi.object<UserDataEntry>({
    email: joi.string().email().required().min(6).max(30),
    password: joi.string().required().min(6).max(30)
});

export const userPayloadSchema = joi.object({
    id: joi.number().required()
});