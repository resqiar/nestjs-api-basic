import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ValidationPipe } from 'src/shared/pipes/validation.pipe'
import { Posts } from './entities/post.entity'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	/**
	 * Create new post data and save it to the database
	 * @URL posts/create
	 */
	@ApiCreatedResponse({ type: Posts })
	@Post('create')
	@UsePipes(new ValidationPipe())
	async create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
		return this.postsService.create(createPostDto)
	}

	/**
	 * Get all posts data from database
	 * @URL posts/
	 */
	@ApiOkResponse({ type: Posts, isArray: true })
	@Get()
	async findAll(): Promise<Posts[]> {
		return this.postsService.findAll()
	}

	/**
	 * Get single post data from database
	 * @URL users/:id
	 */
	@ApiOkResponse({ type: Posts })
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Posts> {
		return this.postsService.findOne(id)
	}

	/**
	 * Edit posts data from database
	 * @URL posts/:id
	 */
	@ApiOkResponse({ type: Posts })
	@Patch(':id')
	@UsePipes(new ValidationPipe())
	async update(
		@Param('id') id: string,
		@Body() updatePostDto: UpdatePostDto
	): Promise<Posts> {
		return this.postsService.update(id, updatePostDto)
	}

	/**
	 * Delete post data from database
	 * @URL posts/:id
	 */
	@ApiOkResponse({ type: Object })
	@Delete(':id')
	@UsePipes(new ValidationPipe())
	async remove(@Param('id') id: string): Promise<{}> {
		return this.postsService.remove(id)
	}
}
