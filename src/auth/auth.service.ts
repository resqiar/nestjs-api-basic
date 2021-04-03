import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/users.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<User> {
		const user = await this.usersService.get(username)
		const hashedPassword = await this.usersService.getUserPasswordCred(username)

		/**
		 * Compare Input Password with Hashed Password
		 * Using bcrypt
		 */
		const isValid = await bcrypt.compare(password, hashedPassword.password)

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

	async generateToken(user: User) {
		const payload = { id: user._id, username: user.username }
		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}
}
