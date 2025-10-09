const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('../src/routes/authRoute');
const carsRoute = require('../src/routes/carsRoute');
const dealersRoute = require('../src/routes/dealersRoute');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auction', authRoute);
app.use('/api/v1/car', carsRoute);
app.use('/api/v1/dealers', dealersRoute);



// simple health
app.get('/', (req, res) => res.status(200).json({ message: 'car auction system is up and running' }));

module.exports = app;