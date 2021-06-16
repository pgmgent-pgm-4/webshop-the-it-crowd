'use strict';
const faker = require('faker');

const list = [] 

for (let i = 0; i < 150; i++) {
    const obj = {
        score: Math.floor(Math.random() * 10),
        description: faker.commerce.productDescription(),
        productId: Math.floor(Math.random() * 150),
        profileId: Math.floor(Math.random() * 150),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      list.push(obj)
    
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Review', [...list]);
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Review', null, {});
      }
    };
    
