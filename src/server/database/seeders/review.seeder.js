import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('reviews');

  for (let index = 0; index < 50; index++) {
    let review = {};
    review.user_id = Math.floor(Math.random() * 50);
    review.product_id =  Math.floor(Math.random() * 50);
    review.score = Math.floor(Math.random() * 5);
    review.description = faker.commerce.productDescription();
    review.createdAt = Date.now();
    console.log('example review', review)

  
        await Database.save(review)
    }