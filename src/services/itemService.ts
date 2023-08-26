import itemRepository from "../repositories/itemRepository";

async function getItems(){
    return await itemRepository.getItems();
}

async function createItem(){
    await itemRepository.createItem();
}

const itemService = {
    getItems,
    createItem
}

export default itemService;