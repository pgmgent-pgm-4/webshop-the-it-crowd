'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
    const obj = {
        firstName: faker.name.firstName(),
        lastName:faker.name.lastName(),
        photo: faker.internet.url(),
        dob: new Date(),
        street: Math.floor(Math.random() * 150),
        streetNr: Math.floor(Math.random() * 150),
        country: Math.floor(Math.random() * 150),
        city: Math.floor(Math.random() * 150),
        zipCode: Math.floor(Math.random() * 150),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    list.push(obj)
    
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Profile', [...list]);
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Profile', null, {});
      }
    };
    
