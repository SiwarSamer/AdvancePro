const Review = require('../../models/review.model');

// POST: Add a review
exports.addReview = (req, res) => {
    const { user_id, rental_id, rating, comments } = req.body;
    if (!user_id || !rental_id || !rating) {
        return res.status(400).send('Missing required fields');
    }
    Review.createReview(user_id, rental_id, rating, comments, (err, result) => {
        if (err) return res.status(500).send('Error adding review: ' + err.message);
        res.status(201).send('Review added successfully');
    });
};

// GET: Fetch reviews for a rental
exports.getReviews = (req, res) => {
    const { rental_id } = req.params;
    if (!rental_id) return res.status(400).send('Missing rental ID');
    Review.getReviewsByRental(rental_id, (err, results) => {
        if (err) return res.status(500).send('Error fetching reviews: ' + err.message);
        res.status(200).json(results);
    });
};
