'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
   const obj = {
    categoryId: Math.floor(Math.random() * 150),
    productId: Math.floor(Math.random() * 150),
    createdAt: new Date(),
    updatedAt: new Date()
   }
   list.push(obj)
    
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('ProductCategory', [...list]);
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ProductCategory', null, {});
      }
    };
    
