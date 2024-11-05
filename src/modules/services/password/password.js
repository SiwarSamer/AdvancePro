// password.js
const express = require('express');
const { updateUserPasswordByEmail } = require('./password.controller'); 
const bcrypt = require('bcrypt');
const { authenticateJWT } = require('../../middleware/middleware.js'); 

const router = express.Router();

// Define route to reset password
router.post('/reset-password', authenticateJWT, async (req, res) => {
    const { email, newPassword } = req.body;

    // Validate the new password
    if (!newPassword || !newPassword.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
        return res.status(400).json({ message: 'Password must contain both letters and numbers' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 5);

        // Call the controller function to update the password
        const affectedRows = await updateUserPasswordByEmail(email, hashedPassword);

        // Check if the password was successfully updated
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Password changed successfully.' });
        } else {
            res.status(404).json({ message: 'User not found or password not updated.' });
        }
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'An error occurred while updating the password.' });
    }
});

module.exports = router;
