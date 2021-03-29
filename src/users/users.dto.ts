import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UserDTO {
	@ApiProperty()
	username: string

	@ApiProperty()
	email: string

	@ApiPropertyOptional()
	age?: number

	@ApiPropertyOptional()
	isPaid?: boolean
}
