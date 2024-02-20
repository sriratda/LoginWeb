const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/regiter', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.get('/login', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/information', (req, res) =>{
    res.status(200);
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../views/information.html'));
});

router.post('/register/user', (req, res) => {
    console.log(req.body);
});

module.exports = router;