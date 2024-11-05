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
<<<<<<< HEAD
=======
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
>>>>>>> 3155a3d48da58fc63afdfb025eaff8bebcc4718a
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
<<<<<<< HEAD
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
=======
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
>>>>>>> 3155a3d48da58fc63afdfb025eaff8bebcc4718a
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
<<<<<<< HEAD
    tableName: 'dresses', 
    timestamps: false // If you want Sequelize to automatically manage createdAt and updatedAt, set this to true
=======
    tableName: 'dresses',
    timestamps: false,
>>>>>>> 3155a3d48da58fc63afdfb025eaff8bebcc4718a
});

module.exports = Dress;
