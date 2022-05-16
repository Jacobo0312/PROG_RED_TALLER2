import {User} from "../types/User";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const findOne = (userId: number, callback: Function) => {
  const queryString = `
  SELECT * FROM taller2.users WHERE id = ? LIMIT 1`
    
  db.query(queryString, userId, (err, result) => {
    if (err) {callback(err)}
    
    const row = (<RowDataPacket> result)[0];
    const user: User =  {
      id: row.id
    }
    callback(null, user);
  });
}

export const create = (user: User, callback: Function) => {
  const queryString = `INSERT INTO taller2.users (id) VALUES (${user.id});`
  db.query(queryString, (err, result) => {
    if (err) {callback(err)}
    callback(null, user);
  });
}




export const findAll = (callback: Function) => {
  const queryString = `
  SELECT * FROM taller2.users`
  db.query(queryString, (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const users: User[] = [];
    
    rows.forEach(row => {
      const user: User =  {
        id: row.id
        }
        users.push(user);
      });
  callback(null, users);
});
}




//List orders by id
export const findAllById = (userId: number, callback: Function) => {
  let queryString = `SELECT * FROM taller2.purcharseorder WHERE user_id = ?;`;
  db.query(queryString, [userId], (err, result) => {
      if (err) { callback(err) }
      callback(null, result);
  }
  );
}







