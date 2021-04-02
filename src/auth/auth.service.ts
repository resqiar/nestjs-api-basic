import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/users.entity'

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(username: string, password: string): Promise<User> {
		const user = await this.usersService.get(username)

		/**
		 * Compare Input Password with Hashed Password
		 * Using bcrypt
		 */
		const isValid = await bcrypt.compare(password, user.password)

		/**
		 * If password matches with hashed password,
		 * return user data, otherwise return UnauthorizedException
		 */
		if (isValid) {
			return user
		} else {
			throw new UnauthorizedException('Invalid given username/password')
		}
	}
}
