import database from '../seeder.js';
const Database = await (database).getRepository('Order');
const DatabaseUser = await (database).getRepository('User');

let user = await DatabaseUser.findOne(1)
console.log("user",user);

 for (let index = 0; index < 50; index++) {
let order = {};
order.user_id = user.id;
order.orderState = "in progress";
order.createdAt = Date.now();
console.log("example order", order);

    console.log( await Database.save(order) )
 }