import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Order {
    constructor( ) {

    }

    async get() {
        try {
            let myRepo = await this.makeConnection('Order')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }

    
    async add(user_id, products) {
        try {
            let myRepo = await this.makeConnection('Order');
            return myRepo.save( {user_id, products} )
            
        } catch (e) {
            Logger.error(e)
        }
    }

    async update(id, user_id, products) {
        try {
            let myRepo = await this.makeConnection('Order');
            return myRepo.update( {id}, {user_id, products} )
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Order');
            return myRepo.delete({ id })
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('Order')
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
