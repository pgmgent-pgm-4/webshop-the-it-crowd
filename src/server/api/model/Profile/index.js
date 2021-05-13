import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Profile {
    constructor(firstName, lastName ) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    async get() {
        try {
            let myRepo = await this.makeConnection('Profile')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }
    
    async add(firstName, lastName,photo, dob, address1, address2, country, city, zipCode, createdAt, user_id) {
        try {
            let myRepo = await this.makeConnection('Profile');
            return myRepo.save( {firstName, lastName, photo, dob, address1, address2, country, city, zipCode, createdAt, user_id} )
            
        } catch (e) {
            Logger.error(e)
        }
    }    
    
    async update(id, firstName, lastName,photo, dob, address1, address2, country, city, zipCode, createdAt, user_id) {
        try {
            let myRepo = await this.makeConnection('Profile');
            return myRepo.update({id}, {firstName, lastName, photo, dob, address1, address2, country, city, zipCode, createdAt, user_id} )
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Profile');
            return myRepo.delete({ id })
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
        async findOne(id) {
            try {
                let myRepo = await this.makeConnection('Profile')
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
