const express = require('express');
const adminController = require('./admin.controller');

const router = express.Router();

// Routes for admin management
router.post('/create', adminController.createAdmin);
router.put('/update/:id', adminController.updateAdmin);
router.delete('/delete/:id', adminController.deleteAdmin);
router.get('/', adminController.getAdmins);
router.get('/:id', adminController.getAdminById);

module.exports = router;
