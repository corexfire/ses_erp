import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { AuthUser } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.createAccessToken(user);
    const permissions = await this.authService.getUserPermissions({
      userId: user.id,
      isSuperAdmin: user.isSuperAdmin,
    });

    const cookieName = this.authService.getCookieName();
    reply.setCookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { user, permissions };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) reply: FastifyReply) {
    const cookieName = this.authService.getCookieName();
    reply.setCookie(cookieName, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    });
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: FastifyRequest & { user: AuthUser }) {
    const permissions = await this.authService.getUserPermissions({
      userId: req.user.id,
      isSuperAdmin: req.user.isSuperAdmin,
    });
    return { user: req.user, permissions };
  }
}
