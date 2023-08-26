import { Router } from "express";
import itemController from "../controllers/itemController";

const itemRouter = Router();

itemRouter.get('/items',itemController.getItems);
itemRouter.post('/items',itemController.createItem);

export default itemRouter;