import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
	BeforeInsert,
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
	@Column({ unique: true })
	username: string

	@ApiProperty()
	@Column('text')
	@Exclude()
	password: string

	@ApiPropertyOptional()
	@Column({ nullable: true, default: '18' })
	age: number

	@ApiPropertyOptional()
	@Column({ nullable: true, default: false })
	@Exclude()
	isPaid: boolean

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date
}
