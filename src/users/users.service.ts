import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { username } from 'src/database/config/ormconfig'
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
		return await this.UserRepository.find({ relations: ['posts']})
	}

	async getUserPasswordCred(username: string) {
		try {
			return await this.UserRepository.findOneOrFail({
				where: { username: username },
				select: ['password']
			})
		} catch (e) {
			/**
			 * If there is no available user
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}

	async get(username: string) {
		try {
			return await this.UserRepository.findOneOrFail({
				where: { username: username },
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
		try {
			const user = this.UserRepository.create(data)
			return await this.UserRepository.save(user)
		} catch (e) {
			/**
			 * If username doubled/already taken,
			 * Throw BadRequestException error
			 */
			if (/(duplicate)[\s\S]+(key value)/.test(e.message)) {
				throw new BadRequestException(
					`Username ${data.username} has already taken by another user`
				)
			}
		}
	}

	async update(id: string, data: Partial<UserDTO>) {
		try {
			await this.UserRepository.findOneOrFail(id)

			await this.UserRepository.update(id, data)

			return await this.UserRepository.findOneOrFail(id)
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
			await this.UserRepository.findOneOrFail(id)
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
