import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserDTO } from './users.dto'
import { User } from './users.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Get all users available in database
	 * return array of user
	 * @URL users/
	 */
	@Get()
	showAllusers() {
		return this.usersService.show()
	}

	/**
	 * Get specific user based on id
     * @URL users/profile/:id
	 */
	@Get('profile/:id')
	getUserProfile(@Param('id') id: string) {
		return this.usersService.get(id)
	}

	/**
	 * Create new user and save to database
     * @URL users/register
	 */
	@Post('register')
	registerUser(@Body() data: UserDTO) {
		this.usersService.create(data)
	}

	/**
	 * Edit user data from database
     * @URL users/update/:id
	 */
	@Put('update/:id')
	editUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
		this.usersService.update(id, data)
	}

	/**
	 * Delete user data from database
     * @URL users/update/:id
	 */
	@Delete('delete/:id')
	deleteUser(@Param('id') id: string) {
		this.usersService.destroy(id)
	}
}
