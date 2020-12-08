var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var conn = mysql.createConnection({
    user: "127.0.0.1",
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'mountain',
    multipleStatements: true
});

conn.connect(function(error) {
    if (error) {
        console.log("連線失敗");
    } else {
        console.log("連線成功");
        return;
    }
})

module.exports = conn;