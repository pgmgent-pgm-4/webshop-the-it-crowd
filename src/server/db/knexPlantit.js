import knex from 'knex';

const config = {
  client: 'sqlite3',
  connection: {
    filename: './db/plant-it.db3'
  },
  useNullAsDefault: true
}

export default knex(config);