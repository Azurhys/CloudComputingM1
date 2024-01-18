const express = require('express');
const app = express();
const cors = require('cors');
const port = 5001;
const db = require('./db'); 
const mysql = require('mysql');
const fs = require('fs');

app.use(cors());


app.get('/tweets', (req, res) => {
  db.query('SELECT * FROM tweets', (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
      res.status(500).send('Erreur lors de la récupération des tweets');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});