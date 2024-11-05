// migrations/20241102000000-create-notifications.js

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('notifications', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Ensure this matches your users table
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            read: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('notifications');
    }
};

