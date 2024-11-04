
const axios = require('axios');

const getWeatherData = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY; // Ensure you have your API key in the .env file
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    return response.data; // Make sure this returns the correct data format
};

module.exports = { getWeatherData };
