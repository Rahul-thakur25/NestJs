import { Get, Controller, UseGuards } from '@nestjs/common';
import { userService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class userController {
    constructor(userService:userService){}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getMe() {
    return 'hello';
  }
}
