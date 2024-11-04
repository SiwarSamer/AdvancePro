// index.js
const express = require('express');
const sequelize = require('./db/connection.js'); // Ensure this is correctly set up for your database
const userRoutes = require('./src/modules/roles/users/user.js');
const authRoutes = require('./src/modules/auth/auth.js');
const logisticsRoutes = require('./src/modules/routes/logistics.routes.js');
const insuranceRoutes = require('./src/modules/insurance/insurance.js');
const notificationsRoutes = require('./src/modules/notifications/notificationsRoutes.js');
const dressRoutes = require('./src/modules/routes/dressRoutes.js'); // Import dress routes
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/dresses', dressRoutes); // Add dresses route

// Sync database and start server
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
