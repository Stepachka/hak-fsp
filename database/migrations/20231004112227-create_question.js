'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExaminationQuestion', {
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
      examinationId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Examination',
          key: 'id'
        }
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
    await queryInterface.dropTable('ExaminationQuestion')
  }
}
