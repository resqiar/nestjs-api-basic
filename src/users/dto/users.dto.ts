import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UserDTO {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	age?: number

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isPaid?: boolean
}
