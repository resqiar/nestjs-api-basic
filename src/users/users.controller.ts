import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
} from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger'
import { ValidationPipe } from 'src/shared/validation.pipe'
import { UserDTO } from './dto/users.dto'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'

@ApiTags('users')
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
	@Get('profile/:email')
	async getUserProfile(@Param('email') email: string): Promise<User> {
		return await this.usersService.get(email) 
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
	@UsePipes(new ValidationPipe())
	@Put('update/:id')
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
	@Delete('delete/:id')
	async deleteUser(@Param('id') id: string): Promise<{}> {
		return await this.usersService.destroy(id)
	}
}
