// src/modules/routes/dressRoutes.js
const express = require('express');
const { getDressesByCityAndSeason } = require('../controllers/dressController'); // Import the controller
const router = express.Router();

// Define the route for getting dresses by city
router.get('/dresses-by-city', getDressesByCityAndSeason);

module.exports = router; // Ensure this exports the router correctly
