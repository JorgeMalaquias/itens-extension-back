import { Router } from "express";
import itemController from "../controllers/itemController";
import { validateSchema } from "../middlewares/validateSchema";
import { itemSchema } from "../schema/itemSchema";

const itemRouter = Router();

itemRouter.get('/items',itemController.getItems);
itemRouter.post('/items',validateSchema(itemSchema),itemController.createItem);

export default itemRouter;