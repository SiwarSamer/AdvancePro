const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Adjust according to your Sequelize instance

const Dress = sequelize.define('Dress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    style: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // New fields added here
    dailyRate: {
        type: DataTypes.FLOAT,
        allowNull: true // or false depending on your requirements
    },
    weeklyRate: {
        type: DataTypes.FLOAT,
        allowNull: true // or false depending on your requirements
    },
    monthlyRate: {
        type: DataTypes.FLOAT,
        allowNull: true // or false depending on your requirements
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true // or false depending on your requirements
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'dresses', 
    timestamps: false // If you want Sequelize to automatically manage createdAt and updatedAt, set this to true
});

module.exports = Dress;
