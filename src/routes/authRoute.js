const express = require('express');
const { generateAuthToken } = require('../controllers/authController');
const router = express.Router();

router.post("/token", generateAuthToken);

module.exports = router;
