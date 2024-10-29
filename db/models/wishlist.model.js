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
            model: 'dresses', // Table name
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = Wishlist;
