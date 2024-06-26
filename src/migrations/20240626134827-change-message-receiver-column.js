'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change column type to array of strings
    await queryInterface.addColumn('OrganizationLeadSettings', 'message_receiver', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true, // Modify as per your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, revert changes here
    await queryInterface.removeColumn('OrganizationLeadSettings', 'message_receiver', {
      type: Sequelize.STRING,
      allowNull: true, // Modify as per your requirement
      defaultValue: null, // Default value if needed
    });
  }
};
