'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
    const obj = {
        name: faker.commerce.product(),
        photo: faker.internet.url() || "plant-card.png",
        description: faker.commerce.productDescription(),
        synopsis: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        createdAt: new Date(),
        updatedAt: new Date()
    } 
    list.push(obj)
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Product', [...list]);
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Product', null, {});
      }
    };
    
