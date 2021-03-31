import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Posts } from './entities/post.entity'

@Injectable()
export class PostsService {
	/**
	 * Dependency injection used by TypeORM to
	 * List all entity that we interact with
	 * In this service
	 * @param PostRepository
	 */
	constructor(
		@InjectRepository(Posts)
		private readonly PostRepository: Repository<Posts>
	) {}

	async create(createPostDto: CreatePostDto) {
		const post = this.PostRepository.create(createPostDto)
		return await this.PostRepository.save(post)
	}

	async findAll() {
		return await this.PostRepository.find()
	}

	async findOne(id: string) {
		try {
			return await this.PostRepository.findOneOrFail(id)
		} catch (e) {
			/**
			 * If there is no corresponding post
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}

	async update(id: string, updatePostDto: UpdatePostDto) {
		try {
			await this.PostRepository.findOneOrFail(id)

			await this.PostRepository.update(id, updatePostDto)

			return await this.PostRepository.findOneOrFail(id)
		} catch (e) {
			/**
			 * If there is no corresponding post
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}

	async remove(id: string) {
		try {
			await this.PostRepository.findOneOrFail(id)
			return await this.PostRepository.delete(id)
		} catch (e) {
			/**
			 * If there is no corresponding user
			 * Throw NotFoundException error
			 */
			throw new NotFoundException()
		}
	}
}
