const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../../index.html'));
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

router.get('/information/:email', (req, res) => {
    const filePath = path.join(__dirname, '/data.json');

    console.log(req.params.email);

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

    // Fix the variable name here from usersdata to userdata
    const userdata = users.find(user => user.email === req.params.email);

    res.status(200);
    res.type('text/html');

    // Fix the variable name here from usersdata to userdata
    console.log(userdata); // Add this line
    res.render(path.join(__dirname, '../views/information.ejs'), { data: [userdata] });
});



router.post('/register/user', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, '/data.json');
    const email = req.body.email;

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

        // Update the users array before redirecting
        writeUsers(users);

        // Redirect to the information page for the newly registered user
        res.redirect(`/information/${email}`);
    }
    
    
});

// or console.log(users);
// 


module.exports = router;