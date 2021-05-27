import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('users');

   for (let index = 0; index < 50; index++) {
    let user = {};
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    user.email = faker.internet.email();
    user.email_verified = faker.datatype.boolean();
    user.createdAt = Date.now();
    console.log("example user", user);

 
        console.log( await Database.save(user), index )
    }