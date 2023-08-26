import { prisma } from "../database/prisma";

async function getItems(){
    return await prisma.item.findMany();
}

async function createItem(){
    await prisma.item.create({
        data:{
            name:'some name',
            description:'some description'
        }
    });
}

const itemRepository = {
    getItems,
    createItem
}

export default itemRepository;