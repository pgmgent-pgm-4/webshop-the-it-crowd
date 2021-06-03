
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
        "reviews": {
            target: 'reviews',
            type: "one-to-many"
        },
        "order_products": {
            target: "order_products",
            type: "one-to-many"
        },
        "categories": {
            type: 'one-to-many',
            target: 'products_has_categories',
            // joinColumn: [
            //     { name: "id",
            //      referencedColumnName: "product_id" }
            // ]
            joinTable: {
                name: "products_has_categories", // table name for the junction table of this relation
                joinColumn: {
                    name: "product_id",
                    referencedColumnName: "id"
                }
            }
        },
        // "categories": {
        //     type: "many-to-many",
        //     target: 'categories',
        //     joinTable: true,
        //     cascade: true
        // },
        "promotions": {
            target: 'promotions',
            type: "one-to-many"
        }
    }
});
