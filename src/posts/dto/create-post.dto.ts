import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreatePostDto {
	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty()
	@IsString()
	description: string

	@ApiPropertyOptional()
	@IsBoolean()
	isVerified?: boolean
}
