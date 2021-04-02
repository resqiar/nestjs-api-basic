import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	/**
	 * Get all users available in database
	 * return array of user
	 * @URL users/
	 * @Filter username | age | isPaid | email
	 */
	@ApiOkResponse({ type: User, status: 200 })
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: any) {
		return this.authService.generateToken(req.user)
	}
}
