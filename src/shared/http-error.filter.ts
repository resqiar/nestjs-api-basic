import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status = exception.getStatus()
        /** 
         * @Purpose is to generate a custom message
         * Everytime error occured, send an error
         * As an object below
         */
        const error = {
            path: request.url,
            status: status,
            method: request.method,
            message: exception.message,
            timestamp: new Date().toLocaleString('en')
        }
        /**
         * Send a custom error message
         * Corresponding to its status code
         * Error message was generated above
         */
        response.status(status).json(error)
    }
}