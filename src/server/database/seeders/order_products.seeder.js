import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('order_products');

for (let index = 0; index < 50; index++) {
let order_product = {};
order_product.order_id = Math.floor(Math.random() * 50)
order_product.product_id = Math.floor(Math.random() * 50);
order_product.productPrice = faker.commerce.price();
order_product.productAmount = Math.floor(Math.random() * 50);
order_product.createdAt = Date.now();
console.log("example order_product", order_product);


    console.log( await Database.save(order_product), index )
}