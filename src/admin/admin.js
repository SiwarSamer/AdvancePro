const express = require('express');
const adminController = require('./admin.controller');
const { authenticateJWT } = require('../middleware/middleware.js'); 

const router = express.Router();

// Routes for admin management
router.post('/dresses', athenticateJWT, adminController.addDress);
router.delete('/dresses/:id', authenticateJWT, adminController.deleteDress);
router.put('/dresses/:id', authenticateJWT, adminController.updateDress);
module.exports = router;
