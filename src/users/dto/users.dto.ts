import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class UserDTO {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	email: string

	@ApiPropertyOptional()
	@IsNumber()
	age?: number

	@ApiPropertyOptional()
	@IsBoolean()
	isPaid?: boolean
}
