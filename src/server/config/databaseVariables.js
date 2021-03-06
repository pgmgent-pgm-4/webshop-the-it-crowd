const config = {
	development: {
		dialect: 'sqlite',
		storage: './server/data/webshop.db3',
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
	},
	production: {
		dialect: 'sqlite',
		storage: './server/data/webshop.db3',
	},
};

export default config;
