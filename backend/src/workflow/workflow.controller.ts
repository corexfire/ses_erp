import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkflowService } from './workflow.service';
import { AuthUser } from '../auth/auth.types';

@Controller('workflow')
@UseGuards(JwtAuthGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get('definitions')
  async getDefinitions(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('moduleKey') moduleKey?: string,
    @Query('docType') docType?: string,
  ) {
    return this.workflowService.getDefinitions(req.user.tenantId, moduleKey, docType);
  }

  @Get('definitions/:id')
  async getDefinitionById(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.workflowService.getDefinitionById(req.user.tenantId, id);
  }

  @Post('definitions')
  async createDefinition(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() data: { name: string; moduleKey: string; docType: string; steps: any[] },
  ) {
    return this.workflowService.createDefinition(req.user.tenantId, data);
  }

  @Put('definitions/:id')
  async updateDefinition(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() data: { name?: string; isActive?: boolean; steps?: any[] },
  ) {
    return this.workflowService.updateDefinition(req.user.tenantId, id, data);
  }

  @Delete('definitions/:id')
  async deleteDefinition(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.workflowService.deleteDefinition(req.user.tenantId, id);
  }

  @Post('trigger')
  async triggerWorkflow(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() data: { docType: string; docId: string; definitionId?: string },
  ) {
    return this.workflowService.triggerWorkflow(req.user.tenantId, data.docType, data.docId, data.definitionId);
  }

  @Get('inbox')
  async getMyInbox(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.workflowService.getMyInbox(req.user.tenantId, req.user.id);
  }

  @Get('instances')
  async getInstances(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('docType') docType?: string,
    @Query('docId') docId?: string,
    @Query('status') status?: string,
    @Query('assignedToUserId') assignedToUserId?: string,
  ) {
    return this.workflowService.getInstances(req.user.tenantId, { docType, docId, status, assignedToUserId });
  }

  @Get('instances/:id')
  async getInstanceById(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.workflowService.getInstanceById(req.user.tenantId, id);
  }

  @Post('instances/:id/approve')
  async approve(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() data: { comment?: string },
  ) {
    return this.workflowService.approve(req.user.tenantId, req.user.id, id, data.comment);
  }

  @Post('instances/:id/reject')
  async reject(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() data: { comment?: string },
  ) {
    return this.workflowService.reject(req.user.tenantId, req.user.id, id, data.comment);
  }

  @Post('instances/:id/delegate')
  async delegate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() data: { toUserId: string; comment?: string },
  ) {
    return this.workflowService.delegate(req.user.tenantId, req.user.id, id, data.toUserId, data.comment);
  }

  @Post('instances/:id/escalate')
  async escalate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.workflowService.escalate(req.user.tenantId, id);
  }

  @Get('delegations')
  async getDelegations(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.workflowService.getDelegations(req.user.tenantId, req.user.id);
  }

  @Post('delegations')
  async createDelegation(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() data: { toUserId: string; startDate: Date; endDate: Date; notes?: string },
  ) {
    return this.workflowService.createDelegation(req.user.tenantId, req.user.id, data);
  }

  @Put('delegations/:id')
  async updateDelegation(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() data: { toUserId?: string; startDate?: Date; endDate?: Date; isActive?: boolean; notes?: string },
  ) {
    return this.workflowService.updateDelegation(req.user.tenantId, id, req.user.id, data);
  }

  @Delete('delegations/:id')
  async deleteDelegation(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.workflowService.deleteDelegation(req.user.tenantId, id, req.user.id);
  }

  @Get('history')
  async getApprovalHistory(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('docType') docType: string,
    @Query('docId') docId: string,
  ) {
    return this.workflowService.getApprovalHistory(req.user.tenantId, docType, docId);
  }

  @Get('overdue')
  async getOverdueInstances(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.workflowService.getOverdueInstances(req.user.tenantId);
  }
}
