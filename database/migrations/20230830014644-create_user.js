'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
        validate: { len: [3, 12] }
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        validate: { len: [3, 15] }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Role',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User')
  }
}
