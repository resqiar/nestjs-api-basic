import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Posts {
	@ApiProperty()
    @PrimaryGeneratedColumn('uuid')
	_id: string

    @ApiProperty()
	@Column()
	title: string

    @ApiProperty()
	@Column()
	description: string

    @ApiPropertyOptional()
	@Column({ nullable: true, default: false })
	isVerified: boolean

    @ApiProperty()
	@CreateDateColumn()
	createdAt: Date
}
