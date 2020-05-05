const mysql = require('mysql');
const bcrypt = require('bcrypt');

//Defining the mysql connection settings
const con = mysql.createPool({
    user: "webalbum",
    password: "password",
    database: "webAlbum",
    connectionLimit: 10
});

// if mysql(WSL) gives an "Error: connect ECONNREFUSED 127.0.0.1:3306" use "sudo /etc/init.d/mysql start"

//Determine the input argument
if (process.argv[2] === 'create') {
    createTables();
} else if (process.argv[2] === 'delete') {
    deleteTables();
} else {
    console.log('Please insert input commands.')
}

//Create tables in database
function createTables() {
    con.query("CREATE TABLE Images (AlbumName varchar(20), Array varchar(255))", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            con.query("CREATE TABLE Login (Username varchar(20), Password varchar(255))", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    bcrypt.hash("Admin", 10, (err, hash) => { //Password hashing before being inserted into database
                        if (err) {
                            console.log(err);
                        } else {
                            con.query("INSERT into Login values ('Admin',?)", hash, (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('The tables have been created.');
                                }
                            });
                        }
                    })
                }
            })
        }
    })
}


//Delete tables in database
function deleteTables() {
    con.query("DROP TABLE Images", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            con.query("DROP TABLE Login", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('The tables have been deleted.');
                }
            })
        }
    })
}