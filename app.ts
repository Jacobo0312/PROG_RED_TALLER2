import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";

//Routes
import {userRouter} from "./routes/userRouter";
import { productRouter } from "./routes/productRouter";


const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/users", userRouter);

app.use(bodyParser.json());
app.use("/products", productRouter);

app.listen(process.env.PORT, () => {
console.log("Node server started running");
});