// src/modules/services/locationService.js
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const calculateDistance = async (origin, destination) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            throw new Error('Google Maps API key is not defined in .env');
        }

        console.log(`Calculating distance from ${origin} to ${destination}`); // Log the origin and destination

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json`,
            {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey,
                },
                timeout: 5000,
            }
        );

        const { data } = response;

        console.log('Distance Matrix API Response:', data); // Log the full API response

        if (data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.value;
            return distance / 1000; // Convert to kilometers
        }

        throw new Error('Error in distance calculation: ' + data.rows[0].elements[0].status);
    } catch (error) {
        console.error('Google Maps API Error:', error.message); // Log the error message
        return { error: 'Distance calculation failed', details: error.message };
    }
};

module.exports = { calculateDistance };
