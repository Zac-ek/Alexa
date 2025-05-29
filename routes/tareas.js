const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una tarea
router.post('/', (req, res) => {
  const { tarea } = req.body;
  const query = 'INSERT INTO tareas (tarea) VALUES (?)';
  db.query(query, [tarea], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, tarea, estatus: false });
  });
});

// Obtener todas las tareas
router.get('/', (req, res) => {
  db.query('SELECT * FROM tareas', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtener una tarea por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM tareas WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Tarea no encontrada');
    res.json(results[0]);
  });
});

// Actualizar una tarea
router.put('/:id', (req, res) => {
  const { tarea, estatus } = req.body;
  const query = 'UPDATE tareas SET tarea = ?, estatus = ? WHERE id = ?';
  db.query(query, [tarea, estatus, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Tarea actualizada');
  });
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tareas WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Tarea eliminada');
  });
});

module.exports = router;
