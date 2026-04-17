import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcryptjs';
import type { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        tenantId: true,
        email: true,
        name: true,
        passwordHash: true,
        isSuperAdmin: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      name: user.name ?? null,
    };
  }

  async createAccessToken(user: {
    id: string;
    tenantId: string;
    email: string;
    isSuperAdmin: boolean;
  }) {
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
    };
    const expiresIn = (this.configService.get<string>('JWT_EXPIRES_IN') ??
      '1h') as unknown as JwtSignOptions['expiresIn'];
    return this.jwtService.signAsync(payload, { expiresIn });
  }

  async getUserPermissions(input: { userId: string; isSuperAdmin: boolean }) {
    if (input.isSuperAdmin) {
      const all = await this.prisma.permission.findMany({
        select: { key: true },
        orderBy: [{ key: 'asc' }],
      });
      return all.map((p) => p.key);
    }

    const userRoles = await this.prisma.userRole.findMany({
      where: { userId: input.userId },
      select: {
        role: {
          select: {
            permissions: { select: { permission: { select: { key: true } } } },
          },
        },
      },
    });

    const keys = new Set<string>();
    for (const ur of userRoles) {
      for (const rp of ur.role.permissions) {
        keys.add(rp.permission.key);
      }
    }

    return Array.from(keys).sort();
  }

  getCookieName() {
    return this.configService.get<string>('COOKIE_NAME') ?? 'ses_erp_access';
  }
}
