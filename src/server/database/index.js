import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import { databaseVariables, EnvironmentVariables } from '../config/index.js';
const __filename = path.resolve();
const __dirname = path.resolve();

const basename = path.basename(__filename);
const sequelize = new Sequelize({
	...databaseVariables[EnvironmentVariables.NODE_ENV],
	logging: EnvironmentVariables.NODE_ENV === 'development' ? console.log : false,
});
const database = {};

database.connect = async () => {
	database.sequelize = sequelize;
	database.Sequelize = Sequelize;

    try {
        fs.readdirSync(path.join(__dirname, 'server', 'models'))
		.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
		.forEach((file) => {
			// eslint-disable-next-line global-require,import/no-dynamic-require
            console.log(file);
			const model = require(path.join(__dirname, 'server', 'models', file)).default(sequelize, Sequelize.DataTypes);
			database[model.name] = model;
		});

        Object.keys(database).forEach((modelName) => {
            if (database[modelName].associate) {
                database[modelName].associate(database);
            }
        });

        // Sync all models with the database
        await database.sequelize.sync();
    } catch (error) {
        console.log(error);
    }    
	
};

export default database;
