import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('payments');

for (let index = 0; index < 50; index++) {
let payment = {}
payment.user_id = Math.floor(Math.random() * 50);
payment.order_id = Math.floor(Math.random() * 50);
payment.details = faker.commerce.productDescription();
payment.total = faker.commerce.price();
payment.createdAt = Date.now();
console.log("example payment", payment);
    try {
        
        console.log( await Database.save(payment), index )
    } catch (error) {
        console.error(error);
    }
}