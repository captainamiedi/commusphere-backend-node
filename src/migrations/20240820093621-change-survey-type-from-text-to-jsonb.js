'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Surveries', 'content', {
      type: Sequelize.TEXT,
      allowNull: false, // or false, depending on your requirement
    });
    
    await queryInterface.addColumn('Surveries', 'content', {
      type: Sequelize.JSONB,
      allowNull: false, // or false, depending on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Surveries', 'content', {
      type: Sequelize.TEXT,
      allowNull: false, // or false, depending on your requirement
    });

    await queryInterface.removeColumn('Surveries', 'content', {
      type: Sequelize.JSONB,
      allowNull: false, // or false, depending on your requirement
    });
  }
};
