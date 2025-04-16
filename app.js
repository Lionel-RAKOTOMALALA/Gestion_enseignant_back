const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db');

const enseignantRoutes = require('./routes/enseignantRoutes');

const app = express();

// Configuration du port
const PORT = 8081;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test de connexion au démarrage
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à MySQL établie avec succès');
    connection.release();
    
    // Vérification de la table (optionnel car elle existe déjà)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enseignant (
        Matricule VARCHAR(50) NOT NULL PRIMARY KEY,
        Nom VARCHAR(100) NOT NULL,
        Taux_horaire DOUBLE NOT NULL,
        Nbr_heure DOUBLE NOT NULL
      )
    `);
    console.log('✅ Table enseignant vérifiée/prête');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
}

// Initialisation
initializeDatabase();

// Routes
app.use('/api/enseignants', enseignantRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API de gestion des enseignants' });
});

// Gestion des erreurs centralisée
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erreur serveur',
    message: err.message 
  });
});

// Démarrer le serveur seulement si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
  });
}

module.exports = app;