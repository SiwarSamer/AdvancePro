// src/db/models/notification.model.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Ensure the path is correct

const Notification = sequelize.define('Notification', {
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { // Match the column name in the database
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notification_type: {
        type: DataTypes.ENUM('order_status', 'recommendation', 'rental_reminder', 'new_review'),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE, // Use DATE instead of TIMESTAMP
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    is_read: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    tableName: 'notifications', // Ensure the correct table name is used
    timestamps: false // Since you're using `created_at` instead of `createdAt`
});

module.exports = Notification;
