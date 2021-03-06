import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
	type: 'postgres',
	host: '172.17.0.1',
	port: 5432,
	username: 'postgres',
	password: 'admin',
	database: 'crud_basic_nest',
	entities: ['dist/**/*.entity{.ts,.js}'],

	// We are using migrations, synchronize should be set to false.
	synchronize: true,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	// migrationsRun: true,
	// logging: true,
	// logger: 'file',
	subscribers: ['dist/subscribers/*.js'],

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: ['dist/database/migrations/**/*.js'],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: 'src/database/migrations',
	},
}

export = config