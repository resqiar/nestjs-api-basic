import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		/**
		 * If Body is empty
		 * Return @BadRequestException
		 */
		if (value instanceof Object && this.isEmptyBody(value))
			throw new BadRequestException('Required Body Response')

		if (!metatype || !this.toValidate(metatype)) return value

		const object = plainToClass(metatype, value)
		const errors = await validate(object)
		if (errors.length > 0) throw new BadRequestException(this.formatError(errors))
		return value
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object]
		return !types.includes(metatype)
	}

    private formatError(errors: any[]){
        return errors.map(v => {
            for(let property in v.constraints){
                return v.constraints[property]
            }
        }).join(', ')
    }

	private isEmptyBody(value: any): boolean {
		/**
		 * This method return a boolean value
		 * Indicates whether the value is empty
		 * Or not
		 */
		if (Object.keys(value).length > 0) {
			return false
		} else {
			return true
		}
	}
}
