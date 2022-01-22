'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipes', [
      {
        id: 1,
        itemId: 1,
        name: '요리법 1',
        url: 'https://example.com/61e55bd450665b3304392c45',
        domain: 'example1',
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wC',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        itemId: 1,
        name: '요리법 2',
        url: 'https://example.com/61e55bd456899694392c45',
        domain: 'example2',
        image: 'data:image/jpeg;base64,/9j/4AAFFISRgABAQAAAQABAAD/2wC',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recipes', null, {});
  }
};