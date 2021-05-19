
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Order_products", // Will use table name `post` as default behaviour.
    tableName: "order_products", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        productPrice: {
            type: "int",
            nullable: true
        },
        productAmount: {
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
        "orders": {
            target: "Order",
            type: "many-to-one",

        },
        "products": {
            target: "Product",
            type: "many-to-one"
        }
    }
});
