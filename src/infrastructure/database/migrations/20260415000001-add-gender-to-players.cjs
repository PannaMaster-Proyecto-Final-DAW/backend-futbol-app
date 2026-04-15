'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('players', 'gender', {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: false,
      defaultValue: 'male',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('players', 'gender');
    // Optionally drop the enum type if needed (Postgres specific)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_players_gender";');
  },
};
