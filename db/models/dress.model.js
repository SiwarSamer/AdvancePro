// db/models/dress.model.js/
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
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0 // Ensure price is non-negative
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
        type: DataTypes.FLOAT, // Percentage discount for long rentals
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
            max: 90 // Valid latitude range
        }
    },
    pickupLongitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: -180,
            max: 180 // Valid longitude range
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'dresses',
    timestamps: false,
    indexes: [
        {
            unique: false,
            fields: ['available']
        },
        {
            unique: false,
            fields: ['pickupLatitude', 'pickupLongitude']
        }
    ]
});

module.exports = Dress;
