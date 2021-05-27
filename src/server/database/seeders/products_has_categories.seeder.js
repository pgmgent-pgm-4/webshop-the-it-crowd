import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('products_has_categories');

for (let index = 0; index < 50; index++) {
    let product = {};
    product.product_id = Math.floor(Math.random() * 50);
    product.category_id = Math.floor(Math.random() * 50);

    console.log("example product", product);
    console.log( await Database.save(product), index )
}