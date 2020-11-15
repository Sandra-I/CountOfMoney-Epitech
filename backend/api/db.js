const mysql = require("mysql2");
const dbConfig = require("./config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "0.0.0.0",
  port: "33061",
  user: "user",
  password: "user",
  database: "project",
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;