import { Router } from "express";
import itemController from "../controllers/itemController";
import { validateSchema } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { itemSchema } from "../schema/itemSchema";

const itemRouter = Router();

itemRouter.get('/items', validateToken, itemController.getItems);
itemRouter.post('/items', validateToken, validateSchema(itemSchema),itemController.createItem);

export default itemRouter;