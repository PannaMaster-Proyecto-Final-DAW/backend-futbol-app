'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add pictureUrl to countries table
    await queryInterface.addColumn('countries', 'pictureUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // Add pictureUrl to leagues table
    await queryInterface.addColumn('leagues', 'pictureUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove pictureUrl from countries table
    await queryInterface.removeColumn('countries', 'pictureUrl');

    // Remove pictureUrl from leagues table
    await queryInterface.removeColumn('leagues', 'pictureUrl');
  }
};
