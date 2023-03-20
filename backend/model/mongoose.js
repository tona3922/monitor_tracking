import mysql from "mysql2/promise";

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Kazuha@4302$",
    database: "as_bookstore",
});

// connection.query('SELECT * FROM tbl_book;', (err, result, fields) => {
//     console.log(err)
//     console.log(result)
//     // console.log(fields)
// })

export default connection;
