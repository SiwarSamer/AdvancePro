// index.js
const express = require('express');
const sequelize = require('./db/connection.js'); // Ensure this is correctly set up for your database
const userRoutes = require('./src/modules/roles/users/user.js');
const authRoutes = require('./src/modules/auth/auth.js'); 
const adminRoutes = require('./src/modules/roles/admin/admin.js');
const recommendationRoutes = require('./src/modules/recommendations/recommendation.js');
const reviewRoutes = require('./src/modules/reviews/review.js');
const passwordRoutes = require('./src/modules/services/password/password.js'); 
const logisticsRoutes = require('./src/modules/routes/logistics.routes.js');
const insuranceRoutes = require('./src/modules/insurance/insurance.js');
const notificationsRoutes = require('./src/modules/notifications/notificationsRoutes.js');
const dressRoutes = require('./src/modules/routes/dressRoutes.js'); // Import dress routes

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api', passwordRoutes);




app.use('/api/logistics', logisticsRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/dresses', dressRoutes); // Add dresses route
app.use(express.json());
// Sync database and start server
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
