const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Register - for creating a new user account
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Hash the password so we don't store it in plain text!
  const hashedPassword = bcrypt.hashSync(password, 10)

  try {
    await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword])
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    if (err.code === '23505') { // PostgreSQL unique violation code
      res.status(400).json({ message: 'Username already exists' })
    } else {
      res.status(500).json({ message: 'Error registering user' })
    }
  }
})

// Login - check if user exists and password is correct
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username])
    const user = result.rows[0]

    if (!user) return res.status(404).json({ message: 'User not found' })

    // Compare the hashed password
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' })

    // Give the user a token so they stay logged in
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, username: user.username })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error logging in' })
  }
})

module.exports = router
