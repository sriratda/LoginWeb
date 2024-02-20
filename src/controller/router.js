const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/signup', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.get('/login', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/information', (req, res) => {
    const filePath = path.join(__dirname, '/data.json');

    function readUsers() {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading users file:', err);
            return [];
        }
    }

    const users = readUsers();

    res.status(200);
    res.type('text/html');
    res.render(path.join(__dirname, '../views/information.ejs'), {data: users});
});

router.post('/register/user', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, '/data.json');

    function readUsers() {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading users file:', err);
            return [];
        }
    }

    function writeUsers(users) {
        try {
            const jsonData = JSON.stringify(users, null, 1);
            fs.writeFileSync(filePath, jsonData, 'utf8');
            res.redirect('/information')
        } catch (err) {
            console.error('Error writing users file:', err);
            throw err;
        }
    }

    const users = readUsers();

    // Check if the user with the same email already exists
    const existingUser = users.find(user => user.email === data.email);

    if (existingUser) {
        console.log('User with the same email already exists.');
        res.status(400).send('User with the same email already exists.');
    } else {
        // Add the new user only if not already present
        users.push(data);
        writeUsers(users);
        res.status(201).send('User registered successfully.');
    }
});

module.exports = router;