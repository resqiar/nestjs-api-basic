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
		try {
			return await this.UserRepository.findOneOrFail({
				where: { email: email },
			})
		} catch (e) {
			/**
			 * If there is no available user
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}

	async create(data: UserDTO) {
		const user = this.UserRepository.create(data)
		return await this.UserRepository.save(user)
	}

	async update(id: string, data: Partial<UserDTO>) {
		try {
			await this.UserRepository.findOneOrFail({
				where: { _id: id },
			})

			await this.UserRepository.update(id, data)

			return await this.UserRepository.findOneOrFail({
				where: { _id: id },
			})
		} catch (e) {
			/**
			 * If there is no corresponding user
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}

	async destroy(id: string) {
		try {
			await this.UserRepository.findOneOrFail({
				where: { _id: id },
			})

			return await this.UserRepository.delete(id)
		} catch (e) {
			/**
			 * If there is no corresponding user
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}
}
