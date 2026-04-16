'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const standardizeTable = async (tableName) => {
      const tableInfo = await queryInterface.describeTable(tableName);
      if (!tableInfo.pictureUrl && !tableInfo.picture_url) {
        await queryInterface.addColumn(tableName, 'pictureUrl', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      } else if (tableInfo.picture_url) {
        await queryInterface.renameColumn(tableName, 'picture_url', 'pictureUrl');
      }
    };

    await standardizeTable('teams');
    await standardizeTable('countries');
    await standardizeTable('leagues');
  },

  async down(queryInterface, Sequelize) {
    const tables = ['teams', 'countries', 'leagues'];
    for (const table of tables) {
      const tableInfo = await queryInterface.describeTable(table);
      if (tableInfo.pictureUrl) {
        await queryInterface.removeColumn(table, 'pictureUrl');
      }
    }
  },
};
