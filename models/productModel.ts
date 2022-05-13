import { Product } from "../types/Product";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const findOne = (product_id: number, callback: Function) => {
    const queryString = `
  SELECT * FROM taller2.products WHERE product_id = ? LIMIT 1`

    db.query(queryString, product_id, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const product: Product = {
            id: row.id,
            name: row.name,
            price: row.price
        }
        callback(null, product);
    });
}


export const create = (product: Product, callback: Function) => {
    const queryString = `INSERT INTO taller2.products (name,price) VALUES (?,?);`
    db.query(queryString, [product.name, product.price], (err, result) => {
        if (err) { callback(err) }
        callback(null, product);
    });
}


export const deleteOne = (product_id: number, callback: Function) => {
    const queryString = `DELETE FROM taller2.products WHERE product_id = ?`
    db.query(queryString, product_id, (err, result) => {
        if (err) { callback(err) }
        callback(null, product_id);
    }
    );
}








export const findAll = (callback: Function) => {
    const queryString = `
  SELECT * FROM taller2.products`
    db.query(queryString, (err, result) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const users: Product[] = [];

        rows.forEach(row => {
            const product: Product = {
                id: row.id,
                name: row.name,
                price: row.price
            }
            users.push(product);
        });
        callback(null, users);
    });
}






