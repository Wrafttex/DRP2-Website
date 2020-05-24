const mysql = require('mysql');
const databaseSettings = require('./database_settings');

//Defining the mysql connection settings
const con = mysql.createPool({
    user: databaseSettings.username,
    password: databaseSettings.password,
    connectionLimit: 10
});

con.query("CREATE DATABASE webAlbum", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});