import cors from "cors";
import express from "express";
import "express-async-errors";
import itemRouter from "./routers/itemRouter";
import userRouter from "./routers/userRouter";

const app = express();
app.use(express.json());
app.use(cors());


app.use(itemRouter);
app.use(userRouter);


//app.use(errorHandlerMiddleware);

export default app;