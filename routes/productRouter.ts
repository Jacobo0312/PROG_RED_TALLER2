import express, { Request, Response } from "express";
import * as productModel from "../models/productModel";
import { Product } from "../types/Product";
const productRouter = express.Router();




productRouter.get("/", (req: Request, res: Response) => {
    res.send("Hello from userRouter");
}, (err: Error, req: Request, res: Response) => {
    res.status(500).send(err.message);
}
);


productRouter.get("/all", (req: Request, res: Response) => {
    productModel.findAll((err: Error, users: Product[]) => {

        if (err) {
            res.status(500).send(err.message);
        }
        res.json(users);
    }
    );
}, (err: Error, req: Request, res: Response) => {
    res.status(500).send(err.message);
}
);



productRouter.get("/:id", async (req: Request, res: Response) => {
    const productId: number = Number(req.params.id);
    productModel.findOne(productId, (err: Error, product: Product) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": product });
    })
});


productRouter.post("/", async (req: Request, res: Response) => {
    const user: Product = req.body;
    console.log(req.body);
    productModel.create(user, (err: Error, product: Product) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": user });
    }
    )
});


//delete
productRouter.delete("/:id", async (req: Request, res: Response) => {
    const productId: number = Number(req.params.id);
    productModel.deleteOne(productId, (err: Error, product: Product) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": product });
    }
    )
}
);





export { productRouter };