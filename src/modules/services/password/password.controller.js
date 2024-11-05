// passwordcontroller.js
const bcrypt = require('bcrypt');
const User = require('../../../../db/models/user.model'); 

async function updateUserPasswordByEmail(email, newPassword) {
    try {
        const result = await User.update(
            { password: newPassword }, // Update password field
            { where: { email } }       // Filter by email
        );
        return result[0]; // Sequelize returns [affectedRows, _]
    } catch (err) {
        console.error('Error updating password:', err);
        throw err;
    }
}

module.exports = { updateUserPasswordByEmail };
