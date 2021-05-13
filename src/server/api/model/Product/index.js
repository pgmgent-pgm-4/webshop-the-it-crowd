import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Product {
    constructor( ) {

    }

    async get() {
        try {
            let myRepo = await this.makeConnection('Product')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }

    
    async add(title,price,synopsis,description,tags) {
        try {
            let myRepo = await this.makeConnection('Product');
            return myRepo.save( {title,price,synopsis,description,tags} )
            
        } catch (e) {
            Logger.error(e)
        }
    }
    async update(id, title,price,synopsis,description,tags) {
        try {
            let myRepo = await this.makeConnection('Product');
            return myRepo.update( {id}, {title,price,synopsis,description,tags} )
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Product');
            return myRepo.delete({ id })
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('Product')
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

