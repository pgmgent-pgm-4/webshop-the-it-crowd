'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
    let obj = {
        name: faker.commerce.productAdjective(),
        description: faker.commerce.productAdjective(),
        createdAt: new Date,
        updatedAt: new Date
    }
    list.push(obj)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Category', [...list]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Category', null, {});
  }
};