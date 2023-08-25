import { Request, Response } from 'express';
import itemService from '../services/itemService';


async function getItems(req:Request,res:Response){
    await itemService.getItems();
    res.status(200);
}

async function createItem(req:Request,res:Response){
    await itemService.createItem();
    res.status(201).send("new item");
}

const itemController = {
    getItems,
    createItem
}

export default itemController;