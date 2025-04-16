const pool = require('../config/db');

class Enseignant {
  static async create({ matricule, nom, tauxHoraire, nbrHeure }) {
    const [result] = await pool.query(
      'INSERT INTO enseignant (Matricule, Nom, Taux_horaire, Nbr_heure) VALUES (?, ?, ?, ?)',
      [matricule, nom, tauxHoraire, nbrHeure]
    );
    return this.findByMatricule(matricule);
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM enseignant');
    return rows;
  }

  static async findByMatricule(matricule) {
    const [rows] = await pool.query('SELECT * FROM enseignant WHERE Matricule = ?', [matricule]);
    return rows[0];
  }

  static async update(matricule, { nom, tauxHoraire, nbrHeure }) {
    await pool.query(
      'UPDATE enseignant SET Nom = ?, Taux_horaire = ?, Nbr_heure = ? WHERE Matricule = ?',
      [nom, tauxHoraire, nbrHeure, matricule]
    );
    return this.findByMatricule(matricule);
  }

  static async delete(matricule) {
    const [result] = await pool.query('DELETE FROM enseignant WHERE Matricule = ?', [matricule]);
    return result.affectedRows > 0;
  }

  static async getStats() {
    const [stats] = await pool.query(`
      SELECT 
        SUM(Taux_horaire * Nbr_heure) AS total,
        MIN(Taux_horaire * Nbr_heure) AS min,
        MAX(Taux_horaire * Nbr_heure) AS max,
        COUNT(Matricule) AS count
      FROM enseignant
    `);
    return stats[0] || {};
  }
}

module.exports = Enseignant;