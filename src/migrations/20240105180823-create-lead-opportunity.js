'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LeadOpportunities', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      product: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      probability: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      org_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      lead_id: {
        type: Sequelize.UUID,
        allowNull: false
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
    await queryInterface.dropTable('LeadOpportunities');
  }
};