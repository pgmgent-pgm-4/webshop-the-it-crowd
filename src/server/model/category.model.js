
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Category", // Will use table name `post` as default behaviour.
    tableName: "categories", // Optional: Provide `tableName` property to override the default behaviour for table name. 
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
        description: {
            type: "text",
            nullable: true
        }
    },
    relations: {
        
    }
});