const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

// Create MySQL connection
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'quote_dev',
    password: 'Quotiv1@2',
    database: 'quotiverse_db'
});

// Now connect ot MySQL
pool.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connection successful...')
})

// If Databse is not created - but remove the database from the 
// Create MySQL connection block
// app.get('/createdb', (req, res) => {
//    let sql = 'CREATE DATABASE quotiverse_db';
//    pool.query(sql, (err, result) => {
//        if(err) throw err;
//        console.log(result);
//        res.send('Database creation successful...');
//    });
//});

// Create users Table
// app.get('/users', (req, res) => {
    // let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, name VARCHAR(255), username VARCHAR(255), email VARCHAR(255), password_hash VARCHAR(255), PRIMARY KEY id)';
    // pool.query(sql, (err, result) => {
        // if(err) throw err;
        // console.log(result);
        // res.send('users table creation success...');
    // });
// });

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle home.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/app.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/app.js');
});

app.get('/public/styles/register.css', (req, res) => {
    res.sendFile(`${__dirname}/public/styles/register.css`);
});

app.get('/public/images/logo11.png', (req, res) => {
    res.sendFile(`${__dirname}/public/images/logo11.png`);
});

app.get('/public/images/5-1.png', (req, res) => {
    res.sendFile(`${__dirname}/public/images/5-1.png`)
})

app.get('/public/js/register.js', (req, res) => {
    res.sendFile(`${__dirname}/public/js/register.js`);
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', (req, res) => {
    const { name, username, email, password_hash } = req.body;
    // Perform validation and insert data into the database

    const sql = 'INSERT INTO users (name, username, email, password_hash) VALUES (?, ?, ?, ?)';
    pool.query(sql, [name, username, email, password_hash], (error, results) => {

        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        // res.json({ message: 'Registration successful' });
        res.redirect(`http://localhost:3000/user`); // Redirect to the user page
    }); 
});

app.get('/user', (req, res) => {
    res.sendFile(__dirname + '/public/user.html');
})

app.post('/login', (req, res) => {
    const { email, password_hash } = req.body;

    // data validation
    const sql = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    pool.query(sql, [email, password_hash], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database querry error' });
        }

        if (results.length > 0) {
            // Authentication success
            res.redirect('http://localhost:3000/user');
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});


app.listen('3000', () => {
    console.log('Server started listening on port 3000');
});