const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Ensure this points to your Sequelize instance

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users', // The table name for users
            key: 'email',   // The key in the users table
        }
    },
    dressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dresses', // The table name for dresses
            key: 'id',        // The key in the dresses table
        }
    },
    orderType: {
        type: DataTypes.ENUM('purchase', 'rental'),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'canceled', 'returned'),
        defaultValue: 'pending',
    },
    rentalStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    rentalEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

module.exports = Order;
