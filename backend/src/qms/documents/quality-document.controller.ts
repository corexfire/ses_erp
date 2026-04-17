import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { QualityDocumentService } from './quality-document.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('qms/documents')
export class QualityDocumentController {
  constructor(private readonly docService: QualityDocumentService) {}

  @Get()
  @RequirePermissions('qms.documents.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query() query: any) {
    const list = await this.docService.findAll(req.user.tenantId, query);
    return { list };
  }

  @Get(':id')
  @RequirePermissions('qms.documents.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const document = await this.docService.findOne(req.user.tenantId, id);
    return { document };
  }

  @Post()
  @RequirePermissions('qms.documents.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const document = await this.docService.create(req.user.tenantId, { ...body, ownerId: req.user.id });
    return { document };
  }

  @Patch(':id')
  @RequirePermissions('qms.documents.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const document = await this.docService.update(req.user.tenantId, id, body);
    return { document };
  }

  @Delete(':id')
  @RequirePermissions('qms.documents.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.docService.delete(req.user.tenantId, id);
    return { success: true };
  }

  @Post(':id/submit')
  @RequirePermissions('qms.documents.update')
  async submit(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const instance = await this.docService.submitToWorkflow(req.user.tenantId, req.user.id, id);
    return { instance };
  }
}
