// src/modules/routes/logistics.routes.js
const express = require('express');
const { calculateDistance } = require('../services/locationService'); 
const Dress = require('../../../db/models/dress.model');

const router = express.Router();

// Route to calculate the distance between user and item pickup point
router.get('/distance/:dressId', async (req, res) => {
    const { dressId } = req.params; // Get dressId from URL parameters
    const { userLatitude, userLongitude } = req.query; // Get user coordinates from query parameters

    // Validate user coordinates
    if (!userLatitude || !userLongitude || isNaN(userLatitude) || isNaN(userLongitude)) {
        return res.status(400).json({ message: 'Valid user coordinates are required' });
    }

    // Validate dress ID
    if (isNaN(dressId)) {
        return res.status(400).json({ message: 'Invalid dress ID' });
    }

    try {
        // Fetch dress details from the database
        const dress = await Dress.findByPk(dressId);
        if (!dress || !dress.pickupLatitude || !dress.pickupLongitude) {
            return res.status(404).json({ message: 'Dress location not found' });
        }

        // Prepare origin and destination coordinates for distance calculation
        const origin = `${userLatitude},${userLongitude}`;
        const destination = `${dress.pickupLatitude},${dress.pickupLongitude}`;
        
        // Log the coordinates
        console.log(`Calculating distance - Dress ID: ${dressId}, Origin: ${origin}, Destination: ${destination}`);

        // Call the service function to calculate distance
        const distanceResult = await calculateDistance(origin, destination); 

        if (distanceResult && !distanceResult.error) {
            const distance = distanceResult; // Assuming calculateDistance returns distance directly

            const proximityLimit = 10; // Set proximity limit in kilometers
            const message = distance <= proximityLimit
                ? 'Item nearby! Ready for pickup or delivery.'
                : 'Distance calculated successfully.';
                
            return res.json({ distance, message });
        }

        res.status(500).json({ message: 'Distance calculation failed', error: distanceResult.error });
    } catch (error) {
        console.error(`Error calculating distance for dress ID ${dressId}:`, error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
