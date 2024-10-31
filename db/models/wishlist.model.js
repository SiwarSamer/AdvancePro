// db/models/wishlist.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); 

const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dresses', // Ensure this matches the table name in your database
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = Wishlist;
