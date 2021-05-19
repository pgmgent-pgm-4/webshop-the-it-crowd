
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Order", // Will use table name `post` as default behaviour.
    tableName: "orders", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        orderState: {
            type: "int",
            nullable: true
        },
        completedAt:{
            type: "int",
            nullable: true
        },
        createdAt:{
            type: "int",
            nullable: false
        }
    },
    relations: {
        "users": {
            target: "User",
            type: "many-to-one"
        }
    }
});
