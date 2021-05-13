
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Order", // Will use table name `post` as default behaviour.
    tableName: "orders", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        }
    },
    relations: {
        "users_": {
            target: "User",
            type: "many-to-one",
            cascade: true
        },
        "products_": {
            target: "Product",
            type: "many-to-many",
            cascade: true,
            joinTable: true
        }
    }
});
