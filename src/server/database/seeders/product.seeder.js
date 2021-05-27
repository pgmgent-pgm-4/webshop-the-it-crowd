import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('products');

 for (let index = 0; index < 50; index++) {
    let product = {};
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.description = faker.commerce.productDescription();
    product.synopsis = faker.commerce.productDescription();
    product.tags = [ faker.commerce.color(), faker.commerce.color(), faker.commerce.color()].toString()
    product.createdAt = Date.now();


    console.log("example product", product);
    console.log( await Database.save(product) , index)
 }