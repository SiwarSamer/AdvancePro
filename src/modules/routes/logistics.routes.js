// src/modules/routes/logistics.routes.js
const express = require('express');
const { calculateDistance } = require('../services/locationService'); 
const Dress = require('../../../db/models/dress.model');

const router = express.Router();

// Route to calculate the distance between user and item pickup point
router.get('/distance/:dressId', async (req, res) => {
    const { dressId } = req.params; // Get dressId from URL parameters
    const { userLatitude, userLongitude } = req.query; // Get user coordinates from query parameters

    try {
        // Fetch dress details from the database
        const dress = await Dress.findByPk(dressId);
        if (!dress || !dress.pickupLatitude || !dress.pickupLongitude) {
            return res.status(404).json({ message: 'Dress location not found' });
        }

        // Prepare origin and destination coordinates for distance calculation
        const origin = `${userLatitude},${userLongitude}`;
        const destination = `${dress.pickupLatitude},${dress.pickupLongitude}`;
        const distance = await calculateDistance(origin, destination); // Call the service function

        if (distance !== null) {
            const proximityLimit = 10; // Set proximity limit in kilometers

            const message = distance <= proximityLimit
                ? 'Item nearby! Ready for pickup or delivery.'
                : 'Distance calculated successfully.';
                
            return res.json({ distance, message });
        }

        res.status(500).json({ message: 'Distance calculation failed' });
    } catch (error) {
        console.error('Error calculating distance:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
