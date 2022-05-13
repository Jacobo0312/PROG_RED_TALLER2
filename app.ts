import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";

//Routes
import {userRouter} from "./routes/userRouter";
import { productRouter } from "./routes/productRouter";
import { orderRouter } from "./routes/orderRouter";


const app = express();
dotenv.config();



app.use(bodyParser.json());
app.use("/api/users", userRouter);

app.use(bodyParser.json());
app.use("/api/products", productRouter);

app.use(bodyParser.json());
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT, () => {
console.log("Node server started running");
});