const express = require('express');
const adminController = require('./admin.controller');
const verifyAdmin = require('../middleware'); // Middleware for authentication

const router = express.Router();

// Routes for admin management
router.post('/dresses', verifyAdmin, adminController.addDress);
router.delete('/dresses/:id', verifyAdmin, adminController.deleteDress);
router.put('/dresses/:id', verifyAdmin, adminController.updateDress);
module.exports = router;
