'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organisations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      org_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      org_email: {
        type: Sequelize.STRING
      },
      org_size: {
        type: Sequelize.STRING
      },
      org_logo: {
        type: Sequelize.STRING
      },
      org_phone_number: {
        type: Sequelize.STRING
      },
      org_address: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Organisations');
  }
};