'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Messages', 'body', {
      type: Sequelize.TEXT,
      allowNull: true, // or false, depending on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Messages', 'body', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your requirement
    });
  }
};
