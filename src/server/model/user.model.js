
import {EntitySchema} from 'typeorm'

export default new EntitySchema({
    name: "User", // Will use table name `post` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        password: {
            type: "text",
            nullable: false
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        emailVerified: {
            type: "int",
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
        "payments": {
            target: "payments",
            type: "one-to-many"
        }
    }
});