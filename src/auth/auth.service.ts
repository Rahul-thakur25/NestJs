import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      const { hash: _hash, ...userWithoutHash } = user;
      return userWithoutHash;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pMatches = await argon.verify(user.hash, dto.password);
    if (!pMatches) {
      throw new ForbiddenException('Invalid password or Email');
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secretKey = this.config.get<string>('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15d',
      secret: secretKey,
    });
    return {
      accessToken: token,
    };
  }
}
