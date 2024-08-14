'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SurveryComments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      org_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      metadata: {
        type: Sequelize.JSON
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      survey_id: {
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
    await queryInterface.dropTable('SurveryComments');
  }
};