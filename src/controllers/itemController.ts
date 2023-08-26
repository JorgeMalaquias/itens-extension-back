import { Request, Response } from 'express';
import itemService from '../services/itemService';


async function getItems(req:Request,res:Response){
    console.log(process.env.HOST)
    const item:any[]=await itemService.getItems();
    res.status(200).send(item);
}

async function createItem(req:Request,res:Response){
    console.log('aaaaaaaaa')
    await itemService.createItem();
    res.status(201).send("new item");
}

const itemController = {
    getItems,
    createItem
}

export default itemController;