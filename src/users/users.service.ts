import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDTO } from './users.dto'
import { User } from './users.entity'

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
		return await this.UserRepository.findOne({ where: { email: email } })
	}

	async create(data: UserDTO) {
		const user = this.UserRepository.create(data)
		await this.UserRepository.save(user)
		return user
	}

	async update(id: string, data: Partial<UserDTO>) {
		await this.UserRepository.update(id, data)
		return await this.UserRepository.findByIds([id])
	}

	async destroy(id: string) {
		await this.UserRepository.delete(id)
		return { status: 'deleted' }
	}
}
