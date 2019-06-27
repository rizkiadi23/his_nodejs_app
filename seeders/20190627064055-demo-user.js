'use strict';

const uuid = require('uuidv4')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('testuser123', salt)

    return queryInterface.bulkInsert('Users', [{
      id: uuid(),
      firstName: 'Testing',
      lastName: 'User',
      email: 'test@test.com',
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
