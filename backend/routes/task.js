const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../database')

// Middleware to check if the user is logged in using their token
function verifyToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id // Save user ID for later
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Get all tasks for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [req.userId])
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching tasks' })
  }
})

// Add a new task
router.post('/', verifyToken, async (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ message: 'Title is required' })

  try {
    const result = await db.query(
      'INSERT INTO tasks (title, completed, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, false, req.userId]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error adding task' })
  }
})

// Update a task (like marking it as done)
router.put('/:id', verifyToken, async (req, res) => {
  const { title, completed } = req.body
  const taskId = req.params.id

  try {
    if (title !== undefined && completed !== undefined) {
      await db.query(
        'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4',
        [title, completed, taskId, req.userId]
      )
    } else if (title !== undefined) {
      await db.query(
        'UPDATE tasks SET title = $1 WHERE id = $2 AND user_id = $3',
        [title, taskId, req.userId]
      )
    } else if (completed !== undefined) {
      await db.query(
        'UPDATE tasks SET completed = $1 WHERE id = $2 AND user_id = $3',
        [completed, taskId, req.userId]
      )
    }
    res.json({ message: 'Task updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error updating task' })
  }
})

// Delete a task from the list
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.userId])
    res.json({ message: 'Task deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error deleting task' })
  }
})

module.exports = router
