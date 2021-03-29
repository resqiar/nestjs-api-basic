import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	_id: number

	@ApiProperty()
	@Column()
	username: string

	@ApiProperty()
	@Column()
	email: string

	@ApiPropertyOptional()
	@Column({ nullable: true, default: '18' })
	age: number

	@ApiPropertyOptional()
	@Column({ nullable: true, default: false })
	isPaid: boolean

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date
}
