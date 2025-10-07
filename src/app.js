const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// simple health
app.get('/', (req, res) => res.json({ message: 'car auction system is running' }));

module.exports = app;