import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserDTO } from './users.dto'
import { User } from './users.entity'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Get all users available in database
	 * return array of user
	 * @URL users/
	 */
	@ApiOkResponse({ type: User, isArray: true, status: 200 })
	@Get()
	showAllusers(): Promise<User[]> {
		return this.usersService.show()
	}

	/**
	 * Get specific user based on id
	 * @URL users/profile/:id
	 */
	@ApiOkResponse({ type: User, isArray: true, status: 200 })
	@Get('profile/:id')
	getUserProfile(@Param('id') id: string): Promise<User[]> {
		return this.usersService.get(id)
	}

	/**
	 * Create new user and save to database
	 * @URL users/register
	 */
	@ApiCreatedResponse({ type: User })
	@Post('register')
	registerUser(@Body() data: UserDTO): Promise<User> {
		return this.usersService.create(data)
	}

	/**
	 * Edit user data from database
	 * @URL users/update/:id
	 */
	@ApiOkResponse({ type: User, isArray: true, status: 200 })
	@Put('update/:id')
	editUser(
		@Param('id') id: string,
		@Body() data: Partial<UserDTO>
	): Promise<User[]> {
		return this.usersService.update(id, data)
	}

	/**
	 * Delete user data from database
	 * @URL users/update/:id
	 */
	@ApiOkResponse({ type: Object, status: 200 })
	@Delete('delete/:id')
	deleteUser(@Param('id') id: string): Promise<{}> {
		return this.usersService.destroy(id)
	}
}
