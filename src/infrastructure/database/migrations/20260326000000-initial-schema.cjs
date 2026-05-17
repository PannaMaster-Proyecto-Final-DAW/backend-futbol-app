'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false,
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

    // 2. Create countries table
    await queryInterface.createTable('countries', {
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
      pictureUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tierMale: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      tierFemale: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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

    // 3. Create leagues table
    await queryInterface.createTable('leagues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
      },
      pictureUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // 4. Create teams table
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leagueId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'leagues',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pictureUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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

    // 5. Create formations table
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
      goalkeeper: {
        type: Sequelize.ENUM('GK'),
        allowNull: false,
        defaultValue: 'GK',
      },
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

    // 6. Create user_leagues table
    await queryInterface.createTable('user_leagues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inviteCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

    // 7. Create user_league_memberships table
    await queryInterface.createTable('user_league_memberships', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userLeagueId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user_leagues',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    // 8. Create players table
    await queryInterface.createTable('players', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      birthdate: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '1900-01-01',
      },
      position: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      teamId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pictureUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
        defaultValue: 'male',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      generalPosition: {
        type: Sequelize.ENUM('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'),
        allowNull: false,
      },
    });

    // 9. Create daily_challenges table
    await queryInterface.createTable('daily_challenges', {
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      gameId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      modeId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      challengeData: {
        type: Sequelize.JSONB,
        allowNull: false,
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

    // 10. Create user_game_attempts table
    await queryInterface.createTable('user_game_attempts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gameId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modeId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM('pending', 'won', 'lost'),
        allowNull: false,
        defaultValue: 'pending',
      },
      history: {
        type: Sequelize.JSONB,
        allowNull: true,
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

    // Add unique composite index
    await queryInterface.addIndex('user_game_attempts', ['userId', 'date', 'gameId'], {
      unique: true,
      name: 'user_game_attempt_unique_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('user_game_attempts');
    await queryInterface.dropTable('daily_challenges');
    await queryInterface.dropTable('players');
    await queryInterface.dropTable('user_league_memberships');
    await queryInterface.dropTable('user_leagues');
    await queryInterface.dropTable('formations');
    await queryInterface.dropTable('teams');
    await queryInterface.dropTable('leagues');
    await queryInterface.dropTable('countries');
    await queryInterface.dropTable('users');

    // Clean up custom types (Postgres specific)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_user_game_attempts_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_formations_goalkeeper";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leagues_category";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_players_gender";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_players_generalPosition";');
  },
};
