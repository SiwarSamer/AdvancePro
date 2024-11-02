// Import necessary modules
const express = require('express');
const sequelize = require('./db/connection.js');
const userRoutes = require('./src/modules/roles/users/user.js');
const authRoutes = require('./src/modules/auth/auth.js'); 
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 

// Sync the database and start the server
sequelize.sync()
    .then(() => {
        console.log('Database synced');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Database sync failed:', err);
        process.exit(1); // Exit process with failure
    });
