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
        active: {
            type: "int"
        },
        value: {
            type: "text",
            nullable: false
        },
        type: {
            type: "text",
            nullable: true
        },
        createdAt: {
            type: "int"
        },
        modifiedAt: {
            type: "int",
            nullable: true
        }
    },
    relations: {
        "product": {
            target: "Product",
            type: "many-to-one",
            cascade: true
        }
    }
});