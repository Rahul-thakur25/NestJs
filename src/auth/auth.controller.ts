import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  @Post('signIn')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
