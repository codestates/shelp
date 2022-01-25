'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Kim',
      email: 'example@example.com',
      password: bcrypt.hashSync('example', 10),
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgSFSDFABAAD/2wC',
      period: 3,
      desc: '자취 1년차',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};