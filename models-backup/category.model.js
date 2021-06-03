
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
        // "products": {
        //     type: 'one-to-many',
        //     target: 'products_has_categories',
        //     joinColumn: [
        //         { name: "id",
        //          referencedColumnName: "category_id" }
        //     ],
        //     joinTable: {
        //         name: "question_categories", // table name for the junction table of this relation
        //         joinColumn: {
        //             name: "question",
        //             referencedColumnName: "id"
        //         },
        //         inverseJoinColumn: {
        //             name: "category",
        //             referencedColumnName: "id"
        //         }
        //     }
        // }
        "products": {
            type: 'many-to-many',
            target: 'products_has_categories',
            // joinColumn: [
            //     { name: "id",
            //      referencedColumnName: "product_id" }
            // ]
            joinTable: {
                name: "products_has_categories", // table name for the junction table of this relation
                joinColumn: {
                    name: "category_id",
                    referencedColumnName: "id"
                }
            }
        },
    }
});