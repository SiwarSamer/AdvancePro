const express = require('express');
const reviewController = require('./review.controller');
const router = express.Router();

router.post('/', reviewController.addReview);
router.get('/:rental_id', reviewController.getReviews);

module.exports = router;
