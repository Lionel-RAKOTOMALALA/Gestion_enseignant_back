const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/enseignantController');

// Routes CRUD complètes
router.post('/', enseignantController.createEnseignant);          // Créer un employé
router.get('/', enseignantController.getAllEnseignants);         // Lister tous les employés avec stats
router.get('/:matricule', enseignantController.getOneEnseignant); // Obtenir un enseignant spécifique
router.put('/:matricule', enseignantController.updateEnseignant); // Mettre à jour un enseignant
router.delete('/:matricule', enseignantController.deleteEnseignant); // Supprimer un enseignant
// Route supplémentaire pour les stats seules (si besoin d'un rafraîchissement séparé)
router.get('/stats/total', enseignantController.getStats);    // Obtenir uniquement les stats

module.exports = router;