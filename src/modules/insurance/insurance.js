// src/modules/insurance/insurance.js
const express = require('express');
const router = express.Router();

// Mock insurance rates (you can replace these with real rates from a database or external service)
const insuranceRates = {
    standard: 5, // 5% of the product value
    premium: 10,  // 10% of the product value
};

// Endpoint to get insurance options
router.get('/options', (req, res) => {
    res.json(insuranceRates);
});

// Endpoint to purchase insurance
router.post('/purchase', (req, res) => {
    const { productId, coverageType } = req.body;

    // Validate coverage type
    if (!insuranceRates[coverageType]) {
        return res.status(400).json({ error: 'Invalid coverage type' });
    }

    // Mock product price (replace with actual product price retrieval)
    const productPrice = 100; // Placeholder for demonstration
    const insuranceCost = (productPrice * insuranceRates[coverageType]) / 100;

    // Here you would process the payment and save the insurance details in your database
    // For now, just return a success message
    res.json({ message: 'Insurance purchased successfully', cost: insuranceCost });
});

module.exports = router;

