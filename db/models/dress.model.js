// db/models/dress.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Adjust according to your Sequelize instance

const Dress = sequelize.define('Dress', {
    dress_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Dress;
