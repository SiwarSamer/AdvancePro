const Recommendation = require('../../../db/models/recommendations.model');

exports.getRecommendations = async (req, res) => {
    const { user_id } = req.params;  // Get user_id from request parameters
    if (!user_id) return res.status(400).send('Missing user ID');

    try {
        const results = await Recommendation.getRecommendationsForUser(user_id); // Await the results
        res.status(200).json(results); // Send the results back in the response
    } catch (err) {
        return res.status(500).send('Error fetching recommendations: ' + err.message); // Handle errors
    }
};