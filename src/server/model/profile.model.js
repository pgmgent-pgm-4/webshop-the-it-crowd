
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "Profile", // Will use table name `post` as default behaviour.
    tableName: "profiles", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        firstName: {
            type: "varchar"
        },
        lastName: {
            type: "varchar"
        },
        photo: {
            type:"text" 
        },
        dob: {
            type: "int",
        },
        street: {
            type: "varchar"
        },
        streetNr: {
            type: "varchar"
        },
        country: {
            type: "varchar"
        },
        city: {
            type: "varchar"
        },
        zipCode: {
            type: "varchar"
        },
        createdAt: {
             type: "int"
        },
        modifiedAt: {
             type: "int",
             nullable: true
        },
        user_id: {
            type: 'int',
            nullable: false
        }
    },
    relations: {

    }
});
