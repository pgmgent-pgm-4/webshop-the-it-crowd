import typeorm from 'typeorm';
import UserSchema from './server/api/model/User/UserSchema.js';
import ProfileSchema from './server/api/model/Profile/ProfileSchema.js';
import CategorySchema from './server/api/model/Category/CategorySchema.js';
import ProductSchema from './server/api/model/Product/ProductSchema.js';
import ReviewSchema from './server/api/model/Review/ReviewSchema.js';
import OrderSchema from './server/api/model/Order/OrderSchema.js';
import PaymentSchema from './server/api/model/Payment/PaymentSchema.js';
import PromotionSchema from './server/api/model/Promotion/PromotionSchema.js';

export default typeorm.createConnection({
    type: "better-sqlite3",
    // host: "localhost",
    // port: 3306,
    // username: "test",
    // password: "test",
    database: "server/db/tester.db3",
    synchronize: true,
    logging: true,
    entities: [
        UserSchema,
        ProfileSchema,
        CategorySchema,
        ProductSchema,
        ReviewSchema,
        OrderSchema,
        PaymentSchema,
        PromotionSchema
    ]
})