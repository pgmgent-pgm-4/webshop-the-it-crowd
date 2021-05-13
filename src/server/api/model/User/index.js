import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class User {
    constructor(username, userpwd, email,create_date ) {
        this.username = username;
        this.userpwd = userpwd;
        this.email = email;
        this.create_date = create_date;
    }

    async get() {
        try {
            let myRepo = await this.makeConnection('User')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }


    async add(username, userpwd, email, createdAt) {
        try {
            let myRepo = await this.makeConnection('User');
            return myRepo.save( {username, userpwd, email, createdAt} )

        } catch (e) {
            Logger.error(e)
        }
    }

    async update(id, username, userpwd, email, createdAt) {
        try {
            let myRepo = await this.makeConnection('User');
            return myRepo.save( {id}, {username, userpwd, email, createdAt} )

        } catch (e) {
            Logger.error(e)
        }
    }

    async delete(id) {
        try {
            let myRepo = await this.makeConnection('User');
            return myRepo.delete({ id })

        } catch (e) {
            Logger.error(e)
        }
    }

    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('User')
            return myRepo.findOne({ id })

        } catch (e) {
            Logger.error(e)
        }
    }


    async makeConnection(tbl) {
        try {
            let conn = await typeormConfig
            return await conn.getRepository(tbl)
            
        } catch (e) {
            Logger.error(e)
        }
    }
}
