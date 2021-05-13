import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Promotion {
    constructor(title, description ) {
        this.title = title;
        this.description = description;

    }

    async get() {
        try {
            let myRepo = await this.makeConnection('Promotion')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }


    async add(  title, promoCode, active, value, type) {
        try {
            let myRepo = await this.makeConnection('Promotion');
            return myRepo.save( {  title, promoCode, active, value, type} )

        } catch (e) {
            Logger.error(e)
        }
    }
    async update( id, title, promoCode, active, value, type) {
        try {
            let myRepo = await this.makeConnection('Promotion');
            return myRepo.update( {id},  {  title, promoCode, active, value, type} )

        } catch (e) {
            Logger.error(e)
        }
    }

    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Promotion');
            return myRepo.delete({ id })

        } catch (e) {
            Logger.error(e)
        }
    }

    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('Promotion')
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
