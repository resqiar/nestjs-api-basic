import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpErrorFilter } from './shared/http-error.filter'
import { LoggingInterceptor } from './shared/logging.interceptor'

@Module({
	imports: [UsersModule, DatabaseModule],
	providers: [
    /**
     * This providers is going to filter
     * All error that happens on API call
     * And return a custom error handling
     */
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
    /**
     * This providers is going to intercept
     * Any HttpRequest and log everything
     * Log message is defined in LoggingInterceptor
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
	],
})
export class AppModule {}
