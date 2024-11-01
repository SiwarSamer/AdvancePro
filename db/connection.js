const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Import models
const User = require('./user.model');
const Rental = require('./rental.model');
const Review = require('./review.model');
const Recommendation = require('./recommendation.model');

// Define associations
User.hasMany(Review, { foreignKey: 'user_id' });
Rental.hasMany(Review, { foreignKey: 'rental_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Rental, { foreignKey: 'rental_id' });

User.hasMany(Recommendation, { foreignKey: 'user_id' });
Recommendation.belongsTo(User, { foreignKey: 'user_id' });

// Export the sequelize instance and the models
module.exports = { sequelize, User, Rental, Review, Recommendation };
sequelize.sync({ alter: true })
    .then(() => console.log('Models synchronized with the database...'))
    .catch(err => console.log('Error synchronizing models: ' + err));
