const express = require('express');
const bodyParser = require('body-parser');
const carsRoute = require('../src/routes/carsRoute');
const dealersRoute = require('../src/routes/dealersRoute');
const auctionRoutes = require('../src/routes/auctionRoute');
const bidRoutes = require('../src/routes/bidRoute');
const adminRoute = require('../src/routes/adminRoute');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/car', carsRoute);
app.use('/api/v1/dealers', dealersRoute);
app.use('/api/v1/auction', auctionRoutes);
app.use('/api/v1/bid', bidRoutes);



// simple health
app.get('/', (req, res) => res.status(200).json({ message: 'car auction system is up and running' }));

module.exports = app;