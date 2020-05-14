var mysql = require("mysql");
//Database connection
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database : 'sitescout'
});
connection.connect(function(error) { 
    if (error) throw error;
    console.log("Database connected");
});

module.exports = connection;