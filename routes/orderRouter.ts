import express, { Request, Response } from "express";
import * as orderModel from "../models/orderModel";
import { Order } from "../types/Order";
const orderRouter = express.Router();







orderRouter.post("/", async (req: Request, res: Response) => {
    const order: Order = req.body;
    console.log(req.body);
    orderModel.create(order, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    }
    )
});


orderRouter.get("/all", async (req: Request, res: Response) => {
    orderModel.findAll((err: Error, orders: Order[]) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": orders });
        
    }
    )
}
);










export { orderRouter };