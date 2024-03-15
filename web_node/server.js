// Import the required modules
const mysql = require('mysql');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'quote_dev',
    password: 'Quotiv1@2',
    database: 'quotiverse_db',
    // authPlugins: { caching_sha2_password: () => () => Buffer.from('Quotiv1@2') }
});

// Function to execute SQL queries
function executeQuery(sql, params, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        }
        connection.query(sql, params, (error, results) => {
            connection.release(); // Release the connection
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    });
}

// Example usage:
const sql = 'SELECT * FROM users';
executeQuery(sql, [], (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Query results:', results);
    }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});