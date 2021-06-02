
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Review", // Will use table name `post` as default behaviour.
    tableName: "reviews", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        score: {
            type: "int",
            nullable: false
        },
        description: {
            type: "text"
        },
        createdAt: {
            type: "int"
        },
        modifiedAt: {
            type: "int",
            nullable: true
        },
        user_id: {
            type: 'int',
            nullable: false
        },
        product_id: {
            type: 'int',
            nullable: false
        }
    },
    relations: {

    }
});
