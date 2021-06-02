
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "products_has_categories", // Will use table name `post` as default behaviour.
    tableName: "products_has_categories", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
       product_id: {
           type: 'int',
           nullable: false,
           primary: true
       },
       category_id: {
           type: 'int',
           nullable: false,
           primary: true
       },
       price: {
           type: 'int',
           nullable: true,
           primary: false
       }
    },
    relations: {
        
    }
});