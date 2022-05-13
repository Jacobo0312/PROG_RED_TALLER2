import { Order } from "../types/Order";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { ProductOrder } from "../types/ProductOrder";
import { v4 as uuid } from 'uuid';




export const create = (order: Order, callback: Function) => {
    //ORDER ID
    order.id = uuid();
    //------------------
    let queryString = `INSERT INTO taller2.purcharseorder (id,createDate,payDate,paid,user_id) VALUES (?,?,?,?,?);`;

    db.query(queryString, [order.id, order.createDate, order.payDate, order.paid, order.user.id], (err, result) => {
        if (err) { callback(err) }
        callback(null, order);
    });

    queryString = "";

    const products: ProductOrder[] = order.products;

    
    products.forEach(productOrder => {
        queryString = `INSERT INTO taller2.productorder (productOrder_id, product_id, product_quantity) VALUES (?,?,?);`;
        db.query(queryString, [order.id, productOrder.product.id, productOrder.quantity], (err, result) => {
            if (err) { callback(err) }
        }
        );
    });



}



export const findAll = (callback: Function) => {
    const queryString = `SELECT * FROM taller2.purcharseorder`;
    db.query(queryString, (err, result) => {
        if (err) { callback(err) }
        callback(null, result);
    });
}










