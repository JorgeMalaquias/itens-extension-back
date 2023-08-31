import { Request, Response } from 'express';
import itemService from '../services/itemService';


async function getItems(req:Request,res:Response){
    const item:any[]=await itemService.getItems();
    res.status(200).send(item);
}

async function createItem(req:Request,res:Response){
    await itemService.createItem(req.body);
    res.sendStatus(201);
}

const itemController = {
    getItems,
    createItem
}

export default itemController;