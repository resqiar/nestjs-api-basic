import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const PORT: number = Number(process.env.PORT) || 3031

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	/**
	 * Swagger Configuration
	 */
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Basic NestJS API Documentation')
    .setDescription('Basic crud operation powered by NestJS, Postgres, GraphQL, and WebSocket')
    .setVersion('Beta')
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.build()

	/**
	 * Create new configuration object
	 */
	const document = SwaggerModule.createDocument(app, swaggerConfig)

	/**
	 * Setup swagger by passing
	 * Path, app instance, and configurations
	 * Object that created before
	 */
	SwaggerModule.setup('/', app, document)

	/**
	 * Listening on @PORT
	 */
	await app.listen(PORT)
}
bootstrap()
