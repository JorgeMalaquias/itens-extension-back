import joi from 'joi';
import { ItemDataEntry } from '../types';


export const itemSchema = joi.object<ItemDataEntry>({
    name:joi.string().pattern(/^[a-zA-Z]*$/).required(),
    description: joi.string().required()
});