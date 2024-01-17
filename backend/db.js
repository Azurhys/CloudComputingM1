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

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err);
      setTimeout(handleDisconnect, 2000); // réessayez la connexion après 2 secondes
    }
    console.log('Connecté à la base de données');
  });

  connection.on('error', (err) => {
    console.error('Erreur de base de données:', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
