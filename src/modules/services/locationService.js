// src/modules/services/locationService.js
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const calculateDistance = async (origin, destination) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure this is set in your .env file
        if (!apiKey) {
            throw new Error('Google Maps API key is not defined in .env');
        }

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json`,
            {
                params: {
                    origins: origin, // Origin coordinates as a string
                    destinations: destination, // Destination coordinates as a string
                    key: apiKey, // API key for authentication
                },
                timeout: 5000, // 5 seconds timeout
            }
        );
        
        const { data } = response;

        // Check the status of the response
        if (data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.value; // Distance in meters
            return distance / 1000; // Convert to kilometers
        }
        
        throw new Error('Error in distance calculation: ' + data.rows[0].elements[0].status);
    } catch (error) {
        console.error('Google Maps API Error:', error);
        return { error: 'Distance calculation failed', details: error.message };
    }
};

module.exports = { calculateDistance };
