'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmailConfigs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recordValue: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      recordTxt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      selector: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      private_key: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      is_valid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      public_key: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('EmailConfigs');
  }
};