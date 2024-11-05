const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Adjust according to your Sequelize instance
const User = require('./user.model'); // Import the User model

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
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0
        }
    },
    dailyRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    weeklyRate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    monthlyRate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    pickupLatitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: -90,
            max: 90
        }
    },
    pickupLongitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: -180,
            max: 180
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        },
        allowNull: false

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
