import faker from "faker";
import * as uuid from 'uuid';
import database from '../seeder.js';
const Database = await (database).getRepository('promotions');

for (let index = 0; index < 50; index++) {
    let promotion = {};
    promotion.product_id = Math.floor(Math.random() * 50);
    promotion.promoCode = uuid.v4();
    promotion.value = Math.floor(Math.random() * 50) / 50;
    promotion.createdAt = Date.now();
    promotion.fromDate = Date.now();
    promotion.toDate = Date.now();
    console.log("example promotion", promotion);


    console.log( await Database.save(promotion), index )
}