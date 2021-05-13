
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Payment", // Will use table name `post` as default behaviour.
    tableName: "payments", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        }
    },
    relations: {
        "user_": {
            target: "User",
            type: "many-to-one",
            cascade: true
        },
        "order_": {
            target: "Order",
            type: "many-to-one",
            cascade: true
        }
    }
});
