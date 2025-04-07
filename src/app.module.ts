import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [PrismaModule, AuthModule, UserModule, BookmarkModule],
  providers: [PrismaService],
})
export class AppModule {}
