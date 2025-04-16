const Enseignant = require('../models/Enseignant');

exports.createEnseignant = async (req, res, next) => {
  try {
    const { matricule, nom, tauxHoraire, nbrHeure } = req.body;
    const enseignant = await Enseignant.create({ matricule, nom, tauxHoraire, nbrHeure });
    res.status(201).json(enseignant);
  } catch (error) {
    console.error('Error creating enseignant:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEnseignants = async (req, res, next) => {
  try {
    const enseignants = await Enseignant.findAll();
    res.status(200).json(enseignants);
  } catch (error) {
    console.error('Error fetching enseignants:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getOneEnseignant = async (req, res, next) => {
  try {
    const enseignant = await Enseignant.findByMatricule(req.params.matricule);
    if (!enseignant) {
      return res.status(404).json({ error: 'Enseignant non trouvé' });
    }
    res.status(200).json(enseignant);
  } catch (error) {
    console.error('Error fetching enseignant:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateEnseignant = async (req, res, next) => {
  try {
    const { nom, tauxHoraire, nbrHeure } = req.body;
    const enseignant = await Enseignant.update(req.params.matricule, { nom, tauxHoraire, nbrHeure });
    
    if (!enseignant) {
      return res.status(404).json({ error: 'Enseignant non trouvé' });
    }
    
    res.status(200).json(enseignant);
  } catch (error) {
    console.error('Error updating enseignant:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEnseignant = async (req, res, next) => {
  try {
    const success = await Enseignant.delete(req.params.matricule);
    
    if (!success) {
      return res.status(404).json({ error: 'Enseignant non trouvé' });
    }
    
    res.status(200).json({ message: 'Enseignant supprimé !' });
  } catch (error) {
    console.error('Error deleting enseignant:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Enseignant.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(400).json({ error: error.message });
  }
};