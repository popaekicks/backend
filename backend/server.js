const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Import our routes from the routes folder
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')

const app = express()

// Middleware to let our frontend talk to the backend and handle JSON data
app.use(cors())
app.use(express.json())

// Connect our route files to specific paths
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 5000

// Start the server!
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})