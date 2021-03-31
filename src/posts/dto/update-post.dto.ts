import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty()
	@IsString()
	title: string

	@ApiProperty()
	@IsString()
	description: string

	@ApiPropertyOptional()
	@IsBoolean()
	isVerified: boolean
}
