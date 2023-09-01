import joi from 'joi';
import { ItemDataEntry } from '../types';


export const itemSchema = joi.object<ItemDataEntry>({
    name:joi.string().required(),
    description: joi.string().required()
});