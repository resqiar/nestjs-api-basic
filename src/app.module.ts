import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpErrorFilter } from './shared/http-error.filter'

@Module({
	imports: [UsersModule, DatabaseModule],
	controllers: [AppController],
	providers: [
		AppService,
    /**
     * This providers is going to filter
     * All error that happens on API call
     * And return a custom error handling
     */
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
	],
})
export class AppModule {}
