const express = require('express');
const adminController = require('./admin.controller.js');
const { authenticateJWT } = require('../../middleware/middleware.js');

const router = express.Router();

// Routes for admin management
router.post('/dresses', authenticateJWT, adminController.addDress);
router.delete('/dresses/:id', authenticateJWT, adminController.deleteDress);
router.put('/dresses/:id', authenticateJWT, adminController.updateDress);
router.get('/dresses', authenticateJWT, adminController.getAllDresses);
router.put('/dresses/:id/approve', authenticateJWT, adminController.approveDress);
router.get('/revenue-report', authenticateJWT, adminController.getRevenueReport);
router.put('/dresses/:id/verification-status', authenticateJWT, adminController.setVerificationStatus);
router.put('/dresses/:id/set-pricing', authenticateJWT, adminController.setRentalPricing);
router.post('/dresses/:id/calculate-cost', authenticateJWT, adminController.calculateRentalCost);

module.exports = router;
