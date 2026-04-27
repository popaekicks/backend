const { Pool } = require('pg');
require('dotenv').config();

// Connect to our PostgreSQL database
// On Render, we usually get a DATABASE_URL. Locally we might use individual vars.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Fallback to individual variables if DATABASE_URL is not provided
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  // Add SSL requirement for cloud databases like Render
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Create tables if they don't exist yet
const initDb = async () => {
  try {
    // Table for storing user accounts
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    // Table for storing tasks linked to a user
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id)
      );
    `);
    console.log('Database ready');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

initDb();

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
