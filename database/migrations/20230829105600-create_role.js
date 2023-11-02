'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        defaultValue: 'user',
        type: Sequelize.DataTypes.ENUM,
        values: ['user', 'admin', 'owner', 'publisher']
      },
      description: {
        defaultValue: null,
        validate: { len: [5, 50] },
        type: Sequelize.DataTypes.STRING
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.dropTable('Role')
        //queryInterface.sequelize.query('DROP TYPE IF EXIST "enum_Role_name"')
      ])
    )
  }
}
