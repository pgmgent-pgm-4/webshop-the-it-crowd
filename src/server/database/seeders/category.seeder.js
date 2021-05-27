import faker from "faker";
import database from '../seeder.js';
const Database = await (await database).getRepository('Category');

for (let index = 0; index < 50; index++) {
    let category = {};
    category.name = faker.name.firstName();
    category.description = faker.commerce.productDescription();
    console.log("example category", category);

    try {
        await Database.save(category)
    } catch (error) {
        console.error(error)
    }
    console.log( index )
}
