import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { type } from 'src/database/config/ormconfig'
import { User } from 'src/users/entities/users.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
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

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne(type => User, (author: User) => author._id)
	author: User
}
