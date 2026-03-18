'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // Goalkeeper — scalar ENUM (string), not an array
      goalkeeper: {
        type: Sequelize.ENUM('GK'),
        allowNull: false,
        defaultValue: 'GK',
      },
      // Fixed: ARRAY(STRING). ENUM alone cannot store multiple values (arrays).
      // ARRAY(ENUM) is unfortunately not supported by Sequelize CLI.
      defenders: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      midfielders: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      forwards: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the table first, then clean up ENUM types created automatically by PostgreSQL
    await queryInterface.dropTable('formations');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_formations_goalkeeper";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_formations_defenders";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_formations_midfielders";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_formations_forwards";');
  },
};
