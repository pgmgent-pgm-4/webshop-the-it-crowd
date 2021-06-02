
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
        },
        user_id: {
            type: 'int',
            nullable: false
        },
        order_id: {
            type: 'int',
            nullable: false
        }
    },
    relations: {

    }
});
