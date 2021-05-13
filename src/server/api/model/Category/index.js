import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Category {
    constructor(name, description ) {
        this.name = name;
        this.description = description;

    }

    
    async get() {
        try {
            let myRepo = await this.makeConnection('Category')
            return myRepo.find()
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async add(name, description) {
        try {
            let myRepo = await this.makeConnection('Category');
            return myRepo.save( {name, description} )
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async update(id, name, description) {
        try {
            let myRepo = await this.makeConnection('Category');
            return await myRepo.update({ id }, {name, description});
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async delete(id) {
        try {
            let myRepo = await this.makeConnection('Category');
            return myRepo.delete({ id })
            
        } catch (e) {
            Logger.error(e)
        }
    }
    
    async findOne(id) {
        try {
            let myRepo = await this.makeConnection('Category')
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