'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if columns already exist before adding
    const existingColumns = await queryInterface.describeTable('dresses');

    // Add pickupLatitude column if it doesn't exist
    if (!existingColumns.pickupLatitude) {
      await queryInterface.addColumn('dresses', 'pickupLatitude', {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: -90,
          max: 90 // Valid latitude range
        }
      });
    }

    // Add pickupLongitude column if it doesn't exist
    if (!existingColumns.pickupLongitude) {
      await queryInterface.addColumn('dresses', 'pickupLongitude', {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: -180,
          max: 180 // Valid longitude range
        }
      });
    }

    // Remove createdAt and updatedAt columns if they exist
    if (existingColumns.createdAt) {
      await queryInterface.removeColumn('dresses', 'createdAt');
    }
    if (existingColumns.updatedAt) {
      await queryInterface.removeColumn('dresses', 'updatedAt');
    }

    // Add created_at column if it doesn't exist
    if (!existingColumns.created_at) {
      await queryInterface.addColumn('dresses', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use literal for correct MySQL handling
      });
    }

    // Add updated_at column if it doesn't exist
    if (!existingColumns.updated_at) {
      await queryInterface.addColumn('dresses', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use literal for correct MySQL handling
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the columns in case of rollback
    await queryInterface.removeColumn('dresses', 'pickupLatitude');
    await queryInterface.removeColumn('dresses', 'pickupLongitude');
    await queryInterface.removeColumn('dresses', 'created_at');
    await queryInterface.removeColumn('dresses', 'updated_at');
  }
};
