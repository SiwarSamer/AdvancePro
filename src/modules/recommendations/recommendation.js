const express = require('express');
const recommendationController = require('./recommendation.controller');
const router = express.Router();

router.get('/:user_id', recommendationController.getRecommendations);

module.exports = router;
