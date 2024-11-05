const Dress = require('../../../db/models/dress.model'); // Correct path to the Dress model
const { getWeatherData } = require('../services/weatherService'); // Importing weather data service

const getDressesByCityAndSeason = async (req, res) => {
    const { city } = req.query; // Extract the city from the query parameters

    try {
        if (!city) {
            return res.status(400).json({ message: 'City is required' });
        }

        console.log(`Fetching weather data for city: ${city}`);
        const weatherData = await getWeatherData(city); // Fetch weather data based on the city
        
        // Log the response data from the weather API
        console.log('Weather data:', weatherData);

        // Check if weatherData has valid structure and temperature
        const temp = weatherData?.main?.temp; // Using optional chaining to safely access temp

        if (temp === undefined) {
            return res.status(500).json({ message: 'Invalid weather data received' });
        }

        const isWinter = temp <= 10; 
        const isSummer = temp >= 20; 
        const isSpring = temp > 10 && temp < 20; // Define spring temperatures
        const isFall = temp >= 10 && temp < 20; // Optional: define fall temperatures

        console.log(`Is it winter? ${isWinter ? 'Yes' : 'No'}`);
        console.log(`Is it summer? ${isSummer ? 'Yes' : 'No'}`);
        console.log(`Is it spring? ${isSpring ? 'Yes' : 'No'}`);
        console.log(`Is it fall? ${isFall ? 'Yes' : 'No'}`);

        // Prepare where clause based on season
        const whereClause = {
            available: true, // Filter for available dresses
        };

        // Use conditions to set the style in the where clause
        if (isWinter) {
            whereClause.style = 'winter'; // Filter by winter style
        } else if (isSummer) {
            whereClause.style = 'summer'; // Filter by summer style
        } else if (isSpring) {
            whereClause.style = 'spring'; // Filter by spring style
        } else {
            whereClause.style = 'fall'; // Optionally filter by fall style
        }

        // Query dresses based on availability and season
        const dresses = await Dress.findAll({
            where: whereClause
        });

        // Log the dresses found
        console.log('Found dresses:', dresses);

        // Respond with the dresses and season information
        res.json({ dresses, isWinter, isSummer, isSpring, isFall }); 
    } catch (error) {
        console.error('Error fetching dresses:', error);
        res.status(500).json({ message: 'Error fetching dresses', error: error.message });
    }
};

module.exports = { getDressesByCityAndSeason }; // Ensure this is correct
