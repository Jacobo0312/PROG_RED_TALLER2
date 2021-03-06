import express, { Request, Response } from "express";
import * as userModel from "../models/userModel";
import { User } from "../types/User";
import { Order } from "../types/Order";
const userRouter = express.Router();




userRouter.get("/", (req: Request, res: Response) => {
    res.send("Hello from userRouter");
}, (err: Error, req: Request, res: Response) => {
    res.status(500).send(err.message);
}
);


userRouter.get("/all", (req: Request, res: Response) => {
    userModel.findAll((err: Error, users: User[]) => {

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


/*
userRouter.get("/:id", async (req: Request, res: Response) => {
    const userId: number = Number(req.params.id);
    userModel.findOne(userId, (err: Error, user: User) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": user });
    })
});
*/


userRouter.post("/", async (req: Request, res: Response) => {
    const user: User = req.body;
    userModel.create(user, (err: Error, user: User) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": user });
    }
    
    )
});


//List orders by id

userRouter.get("/:id", async (req: Request, res: Response) => {
    const user_id: number = Number(req.params.id);
    userModel.findAllById(user_id, (err: Error, order: Order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    }
    )
}
);




export { userRouter };