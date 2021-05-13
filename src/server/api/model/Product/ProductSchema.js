
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Product", // Will use table name `post` as default behaviour.
    tableName: "products", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        price: {
            type: "int",
            nullable: false
        },
        synopsis: {
            type: "text"
        },
        description: {
            type: "text"
        },
        tags: {
            type: "blob"
        }
    },
    relations: {
        "categories_": {
            target: "Category",
            type: "many-to-many",
            cascade: true,
            joinTable: true
        }
    }
});