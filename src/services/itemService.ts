import itemRepository from "../repositories/itemRepository";
import { ItemDataEntry } from "../types";

async function getItems(){
    return await itemRepository.getItems();
}

async function createItem(dataEntry:ItemDataEntry){
    await itemRepository.createItem(dataEntry);
}

const itemService = {
    getItems,
    createItem
}

export default itemService;