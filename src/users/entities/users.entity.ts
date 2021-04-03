import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { type } from 'src/database/config/ormconfig'
import { Posts } from 'src/posts/entities/post.entity'
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
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
	@Column({select: false, type: 'text'})
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

	@OneToMany(type => Posts, (post: Posts) => post.author)
	posts: Posts[]
}
