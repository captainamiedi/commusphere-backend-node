'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Newsletters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      isTracking: {
        type: Sequelize.BOOLEAN
      },
      sendNow: {
        type: Sequelize.BOOLEAN
      },
      sendTime: {
        type: Sequelize.DATE
      },
      content: {
        type: Sequelize.TEXT
      },
      is_sent: {
        type: Sequelize.BOOLEAN
      },
      read_count: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Newsletters');
  }
};