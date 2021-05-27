import faker from "faker";
import database from '../seeder.js';
const Database = await (database).getRepository('profiles');
for (let index = 0; index < 50; index++) {
let profile = {}
profile.user_id = Math.floor(Math.random() * 50)
profile.firstName = faker.name.firstName();
profile.lastName = faker.name.lastName();
profile.photo = faker.internet.url();
profile.dob = Date.now();
profile.street = faker.address.streetName();
profile.streetNr = faker.address.streetAddress();
profile.country = "Belgium"
profile.city = faker.address.city();
profile.zipCode = faker.address.zipCode();
profile.createdAt = Date.now();
    console.log("example profile", profile);


    console.log( await Database.save(profile), index )
}