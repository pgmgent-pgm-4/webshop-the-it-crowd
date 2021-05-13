import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Payment {
    constructor(user_id, order_id ) {
        this.user_id = user_id;
        this.order_id = order_id;
    }

    async get() {
        try {
            let myRepo = await this.makeConnection('Payment')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }

    
    async add(user_id, order_id) {
        try {
            let myRepo = await this.makeConnection('Payment');
            return myRepo.save( { user_id, order_id} )
            
        } catch (e) {
            Logger.error(e)
        }
    }

    async update(id, user_id, order_id) {
        try {
            let myRepo = await this.makeConnection('Payment');
            return myRepo.update( {id},  { user_id, order_id} )
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Payment');
            return myRepo.delete({ id })
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('Payment')
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
