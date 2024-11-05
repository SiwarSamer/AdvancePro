const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection.js'); 

class Admin extends Model {}

Admin.init({
    // Define your model attributes
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'Admin' });

module.exports = Admin; 
