import express, { Request, Response } from "express";
import { REPL_MODE_STRICT } from "repl";
import * as orderModel from "../models/orderModel";
import { Order } from "../types/Order";
import { ProductOrder } from "../types/ProductOrder";
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


//Find one
orderRouter.get("/:id", async (req: Request, res: Response) => {
    const orderId: string = req.params.id;
    orderModel.findOne(orderId, (err: Error, order: Order) => {
        if (err) {
           
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    }
    )
}
)





//Change paid to true
orderRouter.put("/paid/:id", async (req: Request, res: Response) => {
    const orderId: string = String(req.params.id);
    orderModel.updatePaid(orderId, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    }
    )
}
);


//Add product to order
orderRouter.put("/addProduct/:id", async (req: Request, res: Response) => {
    const orderId: string = String(req.params.id);
    const productOrder: ProductOrder = req.body;

    orderModel.addProduct(orderId, productOrder, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    }
    )
}
);


//Delete product to order
orderRouter.put("/deleteProduct/:id", async (req: Request, res: Response) => {
    const orderId: string = String(req.params.id);
    const productOrder: ProductOrder = req.body;

    orderModel.deleteProduct(orderId, productOrder, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    }
    )
}
);









orderRouter.get("", async (req: Request, res: Response) => {
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