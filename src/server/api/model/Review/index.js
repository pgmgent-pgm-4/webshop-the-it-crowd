import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Review {
    constructor(score, description, user_id, product_id ) {
        this.score = score;
        this.description = description;
        this.user_id = user_id;
        this.product_id = product_id;
    }

    async get() {
        try {
            let myRepo = await this.makeConnection('Review')
            return myRepo.find()

        } catch (e) {
            Logger.error(e)
        }
    }



    async add(score, description, user_id, product_id) {
        try {
            let myRepo = await this.makeConnection('Review');
            return myRepo.save( {score, description, user_id, product_id} )

        } catch (e) {
            Logger.error(e)
        }
    }

    async update(id, score, description, user_id, product_id) {
        try {
            let myRepo = await this.makeConnection('Review');
            return myRepo.save( {id}, {score, description, user_id, product_id} )

        } catch (e) {
            Logger.error(e)
        }
    }

    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Review');
            return myRepo.delete({ id })

        } catch (e) {
            Logger.error(e)
        }
    }
    
    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('Review')
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
