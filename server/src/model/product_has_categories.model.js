
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Products_has_categories", // Will use table name `post` as default behaviour.
    tableName: "products_has_categories", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {

    },
    relations: {
        "products": {
            type: "many-to-one",
            target: "products",
            primary: true
        },
        "categories": {
            type: "many-to-one",
            target: "categories",
            primary: true
        }
    }
});