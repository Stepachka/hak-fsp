'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StaticField', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      originalname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('StaticField')
  }
}
