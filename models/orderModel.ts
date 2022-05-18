import { Order } from "../types/Order";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { ProductOrder } from "../types/ProductOrder";
import { v4 as uuid } from 'uuid';
import { Product } from "../types/Product";




export const create = (order: Order, callback: Function) => {
    //ORDER ID
    order.id = uuid();
    //------------------
    let queryString = `INSERT INTO taller2.purcharseorder (id,createDate,payDate,paid,user_id) VALUES (?,?,?,?,?);`;


    order.createDate = new Date().valueOf();
    if (order.paid) {
        order.payDate = order.createDate;
    }

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

//Delete product to order
export const deleteProduct = (orderId: string, productId: ProductOrder, callback: Function) => {
    //Verify if order paid
    let queryString = `SELECT * FROM taller2.purcharseorder WHERE id = ? LIMIT 1;`;
    db.query(queryString, [orderId], (err, result) => {
        if (err) { callback(err) }
        const row = (<RowDataPacket>result)[0];
        if (row.paid) {
            callback(new Error("Order paid"));
        } else {
            let queryString = `UPDATE taller2.productorder SET product_quantity = product_quantity - ? WHERE productOrder_id = ? AND product_id = ?`;
            db.query(queryString, [productId.quantity, orderId, productId.product.id], (err, result) => {
                if (err) {
                    callback(err);
                }
                callback(null, orderId);
            }
            );
        }
    }
    );

}


//Change paid to true
export const updatePaid = (orderId: string, callback: Function) => {
    let queryString = `UPDATE taller2.purcharseorder SET payDate = ?,paid = true WHERE id = ?;`;
    const time = new Date().valueOf();
    db.query(queryString, [time, orderId], (err, result) => {
        if (err) { callback(err) }
        callback(null, result);
    }
    );
}



export const findOne = (orderId: string, callback: Function) => {
    let queryString = `SELECT * FROM taller2.productorder as o INNER JOIN taller2.products AS p ON p.product_id=o.product_id INNER JOIN  taller2.purcharseorder as po ON po.id = o.productOrder_id where id=?`;
    db.query(queryString, [orderId], (err, result) => {
       
        if (err) { callback(err) }
        const rows = <RowDataPacket[]>result;
        const products: ProductOrder[] = [];
        rows.forEach(row => {
            const product: ProductOrder = {
                product: {
                    id: row.product_id,
                    name: row.name,
                    price: row.price
                },
                quantity: row.product_quantity
            }
            products.push(product);
        }  
        );
        const order: Order = {
            id: rows[0].id,
            createDate: rows[0].createDate,
            payDate: rows[0].payDate,
            paid: rows[0].paid,
            user: {
                id: rows[0].user_id,
            },
            products: products
        }
       
        callback(null, order);

}

    );
}





//Add product to order
export const addProduct = (orderId: string, productOrder: ProductOrder, callback: Function) => {
    //Verify if order paid
    let queryString = `SELECT * FROM taller2.purcharseorder WHERE id = ? LIMIT 1;`;
    db.query(queryString, [orderId], (err, result) => {
        if (err) { callback(err) }
        const row = (<RowDataPacket>result)[0];
        if (row.paid) {
            callback(new Error("Order paid"));
        } else {
            queryString = `INSERT INTO taller2.productorder (productOrder_id, product_id, product_quantity) VALUES (?,?,?);`;
            db.query(queryString, [orderId, productOrder.product.id, productOrder.quantity], (err, result) => {
                if (err) { callback(err) }
                callback(null, productOrder);
            }
            );
        }
    }
    );
}



export const findAll = (callback: Function) => {
    const queryString = `SELECT * FROM taller2.purcharseorder`;
    db.query(queryString, (err, result) => {
        if (err) { callback(err) }
        callback(null, result);
    });
}










