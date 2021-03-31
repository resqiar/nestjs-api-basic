import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDTO } from './dto/users.dto'
import { User } from './entities/users.entity'

@Injectable()
export class UsersService {
	/**
	 * Dependency injection used by TypeORM to
	 * List all entity that we interact with
	 * In this service
	 * @param UserRepository
	 */
	constructor(
		@InjectRepository(User) private UserRepository: Repository<User>
	) {}

	async show(username: string) {
		if (username) {
			return await this.UserRepository.find({
				where: { username: username },
			})
		}
		return await this.UserRepository.find()
	}

	async get(email: string) {
		const user = await this.UserRepository.findOne({
			where: { email: email },
		})
		/**
		 * If there is no available user
		 * Throw NotFoundException error
		 */
		if (!user) throw new NotFoundException()
		/**
		 * If user exist?
		 * Return those array of users
		 */
		return user
	}

	async create(data: UserDTO) {
		const user = this.UserRepository.create(data)
		await this.UserRepository.save(user)
		return user
	}

	async update(id: string, data: Partial<UserDTO>) {
		const user = await this.UserRepository.findOne({ where: { _id: id } })
		/**
		 * If there is no available user
		 * Throw NotFoundException error
		 */
		if (!user) throw new NotFoundException()
		/**
		 * If user exist?
		 * Return result
		 */
		await this.UserRepository.update(id, data)
		return user
	}

	async destroy(id: string) {
		const user = await this.UserRepository.findOne({ where: { _id: id } })
		/**
		 * If there is no available user
		 * Throw NotFoundException error
		 */
		if (!user) throw new NotFoundException()
		/**
		 * If user exist?
		 * Return result
		 */
		await this.UserRepository.delete(id)
		return { user: user, status: 'deleted' }
	}
}
