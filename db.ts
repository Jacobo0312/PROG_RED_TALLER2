import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();


export const db = mysql.createConnection(
    
    
    {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
    
}

);

//connection test
db.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");  
  });


    



