'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrganizationLeadSettings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      stage_probability: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stage_probability_template_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      message_sent: {
        type: Sequelize.BOOLEAN
      },
      message_sent_at: {
        type: Sequelize.DATE
      },
      org_id: {
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
    await queryInterface.dropTable('OrganizationLeadSettings');
  }
};