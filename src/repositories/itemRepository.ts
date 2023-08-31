import { prisma } from "../database/prisma";
import { ItemDataEntry } from "../types";

async function getItems(){
    return await prisma.item.findMany();
}

async function createItem(dataEntry:ItemDataEntry){
    await prisma.item.create({
        data:{
            name: dataEntry.name,
            description: dataEntry.description
        }
    });
}

const itemRepository = {
    getItems,
    createItem
}

export default itemRepository;