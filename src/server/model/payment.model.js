
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Payment", // Will use table name `post` as default behaviour.
    tableName: "payments", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        details:{
            type: "text",
            nullable: true
        },
        total:{
            type: "numeric"
        },
        completedAt: {
            type: "int",
            nullable: true
        },
        createdAt: {
            type: "int",
            nullable: false
        },
        modifiedAt: {
            type: "int",
            nullable: true
        }
    },
    relations: {
        "users": {
            target: "User",
            type: "many-to-one"
        },
        "orders": {
            target: "Order",
            type: "many-to-one"
        }
    }
});
