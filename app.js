const express = require('express')
const app = express()
const port = 3000
const router = require('./src/controller/router');
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});