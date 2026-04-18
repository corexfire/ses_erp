import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { UpsertCompanyProfileDto } from './dto/upsert-company-profile.dto';
import { AuditService } from '../../audit/audit.service';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/company-profile')
export class CompanyProfileController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.company.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }) {
    const companyProfile = await this.prisma.companyProfile.findUnique({
      where: { tenantId: req.user.tenantId! },
    });
    return { companyProfile };
  }

  @Put()
  @RequirePermissions('core.company.update')
  async upsert(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: UpsertCompanyProfileDto,
  ) {
    const companyProfile = await this.prisma.companyProfile.upsert({
      where: { tenantId: req.user.tenantId! },
      update: {
        legalName: body.legalName,
        tradeName: body.tradeName,
        npwp: body.npwp,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        countryCode: body.countryCode ?? 'ID',
        latitude: body.latitude,
        longitude: body.longitude,
        companySize: body.companySize ?? 'KECIL',
      },
      create: {
        tenantId: req.user.tenantId!,
        legalName: body.legalName,
        tradeName: body.tradeName,
        npwp: body.npwp,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        countryCode: body.countryCode ?? 'ID',
        latitude: body.latitude,
        longitude: body.longitude,
        companySize: body.companySize ?? 'KECIL',
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'upsert',
      entity: 'CompanyProfile',
      entityId: companyProfile.id,
    });

    return { companyProfile };
  }
}
