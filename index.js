const express = require('express');
const sequelize = require('./db/connection.js');
const userRoutes = require('./src/modules/roles/users/user.js');
const authRoutes = require('./src/modules/auth/auth.js');
const logisticsRoutes = require('./src/modules/routes/logistics.routes.js');
const insuranceRoutes = require('./src/modules/insurance/insurance.js');
const notificationsRoutes = require('./src/modules/notifications/notificationsRoutes.js'); // Import notifications routes

const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/notifications', notificationsRoutes); // Add notifications routes

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
