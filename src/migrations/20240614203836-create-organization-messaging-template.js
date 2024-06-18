'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrganizationMessagingTemplates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sender_name: {
        type: Sequelize.STRING,
      },
      sender_email: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM(['email', 'sms', 'mms', 'others']),
        defaultValue: 'email'
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
    await queryInterface.dropTable('OrganizationMessagingTemplates');
  }
};