import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
	port: 5432,
	username: 'postgres',
	password: 'admin',
	database: 'crud_basic_nest',
	entities: [__dirname + '/**/*.entity{.ts,.js}'],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	// migrationsRun: false,
	// logging: true,
	// logger: 'file',

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: ['dist/src/database/migrations/**/*.js'],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: 'src/database/migrations',
	},
}

export = config