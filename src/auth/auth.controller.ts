import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;

    if (!name || !email || !password) {
        throw new Error('All fields are required');
    }

    return this.authService.register(name, email, password);
    }

}
