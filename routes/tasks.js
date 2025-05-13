const express = require('express');
const pool = require('../db');
const verifyToken = require('../middleware/auth');

const router = express.Router();

//creat new to-do
router.post('/', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = await pool.query(
            'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, req.user.id]
        );
        res.status(201).json(newTodo.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all to-do tasks for loged in user
router.get('/', verifyToken, async (req, res) => {
    try {
      const tasks = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
        [req.user.id]
      );
      res.json(tasks.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

//update a to-do task by ID
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
      const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [title, description, completed, id, req.user.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

//delete a to-do task by ID
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, req.user.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


module.exports = router;