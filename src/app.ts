import cors from "cors";
import express from "express";
import "express-async-errors";
import itemRouter from "./routers/itemRouter";

const app = express();
app.use(express.json());
app.use(cors());


app.use(itemRouter);


//app.use(errorHandlerMiddleware);

export default app;