import typeormConfig from '../../../../ormConfig.js'
import Logger from '../../lib/Logger.js'

export default class Post {
    constructor(title, text, categories) {
        this.title = title;
        this.text = text;
        this.categories = categories;
    }

    async add(title, text, categories) {
        try {
            let myRepo = await this.makeConnection('Post');
            return myRepo.save( {title, text, categories} )

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