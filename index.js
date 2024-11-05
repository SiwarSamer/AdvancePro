const express = require('express');
const sequelize = require('./db/connection.js');
const userRoutes = require('./src/modules/roles/users/user.js');
const authRoutes = require('./src/modules/auth/auth.js'); 
const adminRoutes = require('./src/modules/roles/admin/admin.js');
const recommendationRoutes = require('./src/modules/recommendations/recommendation.js');
const reviewRoutes = require('./src/modules/review/review.js');
const passwordRoutes = require('./src/modules/services/password/password.js'); 
const app = express();
const cors = require('cors');
const { Dress, Wishlist } = require('./db/models/associations'); 
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api', passwordRoutes);
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
