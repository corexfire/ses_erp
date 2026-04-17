import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  departmentId?: string;

  @IsDateString()
  @IsOptional()
  effectiveDate?: string;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('support/documents')
export class SupportDocumentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('quality.read') // Using quality as a fallback or general read
  async listDocuments(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('category') category?: string,
    @Query('status') status?: string,
  ) {
    return this.prisma.supportDocument.findMany({
      where: { 
        tenantId: req.user.tenantId,
        ...(category ? { category } : {}),
        ...(status ? { status } : {}),
      },
      include: { 
        author: { select: { firstName: true, lastName: true, employeeNo: true } },
        department: { select: { name: true, code: true } }
      },
      orderBy: { code: 'asc' }
    });
  }

  @Get('stats')
  @RequirePermissions('quality.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const docs = await this.prisma.supportDocument.findMany({
      where: { tenantId: req.user.tenantId }
    });

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      total: docs.length,
      published: docs.filter(d => d.status === 'PUBLISHED').length,
      underReview: docs.filter(d => d.status === 'UNDER_REVIEW').length,
      expiringSoon: docs.filter(d => d.expiryDate && d.expiryDate > now && d.expiryDate <= thirtyDaysFromNow).length,
      expired: docs.filter(d => d.expiryDate && d.expiryDate <= now).length,
    };
  }

  @Get(':id')
  @RequirePermissions('quality.read')
  async getDocument(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.supportDocument.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { 
        author: true,
        department: true,
      }
    });
  }

  @Post()
  @RequirePermissions('quality.manage')
  async createDocument(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDocumentDto,
  ) {
    return this.prisma.supportDocument.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        title: body.title,
        description: body.description,
        category: body.category,
        version: body.version,
        status: body.status || 'DRAFT',
        authorId: body.authorId,
        departmentId: body.departmentId,
        effectiveDate: body.effectiveDate ? new Date(body.effectiveDate) : undefined,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
        fileUrl: body.fileUrl,
      }
    });
  }

  @Patch(':id')
  @RequirePermissions('quality.manage')
  async updateDocument(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: Partial<CreateDocumentDto>,
  ) {
    const data: any = { ...body };
    if (body.effectiveDate) data.effectiveDate = new Date(body.effectiveDate);
    if (body.expiryDate) data.expiryDate = new Date(body.expiryDate);

    return this.prisma.supportDocument.update({
      where: { id, tenantId: req.user.tenantId },
      data
    });
  }

  @Delete(':id')
  @RequirePermissions('quality.manage')
  async deleteDocument(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.supportDocument.delete({
      where: { id, tenantId: req.user.tenantId }
    });
  }
}
