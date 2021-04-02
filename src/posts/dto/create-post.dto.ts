import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty()
	@IsString()
	description: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isVerified?: boolean
}
