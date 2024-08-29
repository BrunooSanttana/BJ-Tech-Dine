// migrations/XXXXXX-add-timestamps-to-products.js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
    await queryInterface.addColumn('products', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'createdAt');
    await queryInterface.removeColumn('products', 'updatedAt');
  }
};
