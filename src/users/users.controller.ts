import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { ValidationPipe } from 'src/shared/pipes/validation.pipe'
import { UserDTO } from './dto/users.dto'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'

@ApiTags('users')
/**
 * Interceptors below had a job to
 * Remove sensitive information to client
 * @Removed Password | IsPaid
 */
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Get all users available in database
	 * return array of user
	 * @URL users/
	 * @Filter username | age | isPaid | email
	 */
	@ApiOkResponse({ type: User, isArray: true, status: 200 })
	@ApiQuery({
		name: 'username',
		required: false,
	})
	@Get()
	async showAllusers(@Query('username') username?: string): Promise<User[]> {
		return await this.usersService.show(username)
	}

	/**
	 * Get specific user based on id
	 * @URL users/profile/:id
	 */
	@ApiOkResponse({ type: User, isArray: true, status: 200 })
	@ApiNotFoundResponse()
	@Get('profile/:username')
	async getUserProfile(@Param('username') username: string): Promise<User> {
		return await this.usersService.get(username)
	}

	/**
	 * Create new user and save to database
	 * @URL users/register
	 */
	@ApiCreatedResponse({ type: User })
	@UsePipes(new ValidationPipe())
	@Post('register')
	async registerUser(@Body() data: UserDTO): Promise<User> {
		return await this.usersService.create(data)
	}

	/**
	 * Edit user data from database
	 * @URL users/update/:id
	 */
	@ApiOkResponse({ type: User, isArray: true, status: 200 })
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch('update/:id')
	async editUser(
		@Param('id') id: string,
		@Body() data: Partial<UserDTO>
	): Promise<User> {
		return await this.usersService.update(id, data)
	}

	/**
	 * Delete user data from database
	 * @URL users/update/:id
	 */
	@ApiOkResponse({ type: Object, status: 200 })
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Delete('delete/:id')
	async deleteUser(@Param('id') id: string): Promise<{}> {
		return await this.usersService.destroy(id)
	}
}
