
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
            type:"blob" 
        },
        dob: {
            type: "date",
        },
        address1: {
            type: "varchar"
        },
        address2: {
            type: "varchar",
            nullable: true
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
             type: "datetime"
        },
        lastUpdatedAt: {
             type: "datetime",
             nullable: true
        }
    },
    relations: {
        "users_": {
            target: "User",
            type: "many-to-one",
            cascade: true
        }
    }
});
