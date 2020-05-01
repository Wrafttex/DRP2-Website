const mysql = require('mysql');

const con = mysql.createPool({
    user: "root",
    password: "",
    connectionLimit: 10
});

con.query("CREATE DATABASE webAlbum", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});