import {
    EntitySchema
} from 'typeorm'

export default new EntitySchema({
    name: "Promotion", // Will use table name `post` as default behaviour.
    tableName: "promotions", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        promoCode: {
            type: "varchar",
            nullable: false,
            unique: true
        },
        value: {
            type: "text",
            nullable: false
        },
        fromDate: {
            type: "int"
        },
        toDate: {
            type: "int"
        },
        createdAt: {
            type: "int"
        },
        modifiedAt: {
            type: "int",
            nullable: true
        },
        product_id: {
            type: 'int',
            nullable: false
        }
    },
    relations: {

    }
});