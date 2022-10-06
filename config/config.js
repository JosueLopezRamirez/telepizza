/** @format */

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "containers-us-west-77.railway.app",
  user: "root",
  password: "Q7nzmvjHX2e5kr9LotZY",
  database: "railway",
  port: 7980,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED!");
});

module.exports = db;
