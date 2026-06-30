import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private users: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (exists) throw new ConflictException('Email already registered');
    const hash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash: hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        businessName: dto.businessName,
        role: 'CUSTOMER',
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
    return user;
  }

  async login(user: any, res: Response) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: this.config.get<string>('jwt.refreshExpiresIn', '7d'),
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: await bcrypt.hash(refreshToken, 10) },
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.config.get<boolean>('cookie.secure', false),
      sameSite: 'lax',
      domain: this.config.get<string>('cookie.domain', 'localhost'),
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return { accessToken, user: { id: user.id, email: user.email, role: user.role } };
  }

  async refresh(refreshToken: string, res: Response) {
    let payload: any;
    try {
      payload = this.jwt.verify(refreshToken, { secret: this.config.get<string>('jwt.refreshSecret') });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user?.refreshTokenHash) throw new UnauthorizedException();
    const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!valid) throw new UnauthorizedException();

    return this.login({ id: user.id, email: user.email, role: user.role }, res);
  }

  async logout(userId: string, res: Response) {
    await this.prisma.user.update({ where: { id: userId }, data: { refreshTokenHash: null } });
    res.clearCookie('refresh_token', { path: '/' });
    return { message: 'Logged out' };
  }
}
