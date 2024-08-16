'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('socialMedia', 'watch_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('socialMedia', 'connected_email', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('socialMedia', 'metadata', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('socialMedia', 'watch_id');
    await queryInterface.removeColumn('socialMedia', 'connected_email');
    await queryInterface.removeColumn('socialMedia', 'metadata');
  }
};
