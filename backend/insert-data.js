const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "hof-sqlserver.mysql.database.azure.com",
  user: "hof-user-admin@hof-sqlserver",
  password: "mBtfUJ2?b@djS&z0", // Remplacez par votre mot de passe
    database: "hof-db", // Remplacez par le nom de votre base de données
  port: 3306,
});

connection.query('DROP TABLE IF EXISTS tweets', (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression de la table tweets : ' + err.stack);
      // Fermer la connexion en cas d'erreur
      connection.end();
      return;
    }

    console.log('Table tweets supprimée avec succès.');

    // Script pour créer la table tweets
    const createTableQuery = `
      CREATE TABLE tweets (
          id INT PRIMARY KEY AUTO_INCREMENT,
          category VARCHAR(255) NOT NULL,
          text VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          link VARCHAR(1024) NOT NULL
      );
    `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de la table tweets : ' + err.stack);
      // Fermer la connexion en cas d'erreur
      connection.end();
      return;
    }

    console.log('Table tweets créée avec succès.');

    // Insérer des données initiales
    const initialData = [
        { text: 'Anyway, CHIPI CHIPI CHAPA CHAPA', category: 'Masterclass', author: '@B_sky0516', link: '1738917754261139703' },
        { text: 'Yummy ', category: 'Masterclass', author: '@nocontextscats', link: '1747402670019854348' },
        { text: 'Pas le pingouin qui glisse le plus loin celle la ', category: 'Masterclass', author: '@gana_haaj', link: '1745402849280844099' },
        { text: 'UwU gaming', category: 'Masterclass', author: '@Catshealdeprsn', link: '1747458402295615995' },
        { text: 'UwU trop mignon les chatons UwU j\'adore UwU gaming UwU lol UwU trop pipou UwU', category: 'Masterclass', author: '@Catsillyness', link: '1745408043624350169' },
        { text: 'Good morning, y\'all!', category: 'Masterclass', author: '@AChevyWolf', link: '1745053336670183838' },
        { text: 'match day = lose day', category: 'Gros Flop', author: '@TeamVitality', link: '1747617554674176047' },
        { text: 'Hein ? Attends', category: 'Gros Flop', author: '?????', link: '1477591750088675328' },
        { text: 'Cheh le LOAT', category: 'Gros Flop', author: '@Dekiitwt', link: '1746606685811048616' },
        { text: 'Yes bb, ça c\' est du sanglier', category: 'Chef ???', author: '@AkagamiTW', link: '1745568944339980752' },
        { text: 'Le POTI CHAT', category: 'Chef ???', author: '@bch__269', link: '1747563219483238455' },
        { text: 'Qui le connait ??', category: 'Chef ???', author: '@BFMTV', link: '1745325368330879430' },
        { text: 'C\'est le daron à qui lui ? ', category: 'Chef ???', author: '@LeBonVieuxM', link: '1747358730579054840' },
        { text: 'Avis désastreux + weeb ', category: 'Chef ???', author: '@Lubbarbarek1', link: '1746486793111843151' },
        { text: 'Shaco ult', category: 'Chef ???', author: '@CabochardLoL', link: '1743353101795439100' },
        { text: 'The only Ibai\'s palmares with Mad Lions', category: 'Chef ???', author: '@_kyukai', link:'1746914931700646294' },
    ];

    const insertQuery = 'INSERT INTO tweets (text, category, author, link) VALUES ?';

    connection.query(insertQuery, [initialData.map(({ text, category, author, link }) => [text, category, author, link])], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion des données initiales : ' + err.stack);
      } else {
        console.log('Données initiales insérées avec succès.');
      }

      // Fermer la connexion après l'insertion
      connection.end();
    });
  });
});
