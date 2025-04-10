import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { userController } from './user.controller';

@Module({
  providers: [userService],
  controllers: [userController],
})
export class UserModule {}
