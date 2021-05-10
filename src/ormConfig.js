import typeorm from 'typeorm';
import PostSchema from './server/api/model/Post/PostSchema.js';
import CategorySchema from './server/api/model/Category/CategorySchema.js';

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
        PostSchema,
        CategorySchema
    ]
})