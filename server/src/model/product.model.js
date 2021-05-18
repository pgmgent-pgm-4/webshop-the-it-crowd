
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
        name: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        price: {
            type: "float",
            nullable: false
        },
        synopsis: {
            type: "text",
            nullable: true
        },
        description: {
            type: "text",
            nullable: true
        },
        tags: {
            type: "text",
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
        
    }
});