const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: "hof-sqlserver.mysql.database.azure.com",
    user: "hof-user-admin@hof-sqlserver",
    password: "mBtfUJ2?b@djS&z0", // Remplacez par votre mot de passe
    database: "hof-db", // Remplacez par le nom de votre base de données
    port: 3306
  });

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});



module.exports = connection;
