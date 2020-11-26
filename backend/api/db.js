const mysql = require("mysql2");
const dbConfig = require("./config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});


// open the MySQL connection
//TODO: gestion d'erreur avec loop lorsque la base de données n'est pas encore prête, le serveur envoie actuellement une exception
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;