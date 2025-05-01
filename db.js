const { Pool } = require('pg');
require('dotenv').config(); //load environment variables from .env file


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// test the connection of database
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Connected to the database:', res.rows[0]);
    }
});

module.exports = pool;