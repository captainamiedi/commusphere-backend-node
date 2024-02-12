'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meta', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      access_token: {
        type: Sequelize.TEXT
      },
      long_lived_token: {
        type: Sequelize.TEXT
      },
      page_id: {
        type: Sequelize.STRING
      },
      page_name: {
        type: Sequelize.STRING
      },
      instagram_professional_account_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meta');
  }
};