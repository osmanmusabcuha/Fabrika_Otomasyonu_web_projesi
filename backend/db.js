import mysql from "mysql"

export const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "sql1234",
    database: "fabrika",
});