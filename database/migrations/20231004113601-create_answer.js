'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExaminationAnswer', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      questionId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'ExaminationQuestion',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      isRight: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExaminationAnswer')
  }
}
