import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards, Request, Query
} from '@nestjs/common';
import { FsmService } from './fsm.service';
import { CreateFsmServiceOrderDto } from './dto/create-fsm-service-order.dto';
import { UpdateFsmServiceOrderDto } from './dto/update-fsm-service-order.dto';
import { CreateFsmAppointmentDto } from './dto/create-fsm-appointment.dto';
import { UpdateFsmAppointmentDto } from './dto/update-fsm-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fsm')
@UseGuards(JwtAuthGuard)
export class FsmController {
  constructor(private readonly fsmService: FsmService) {}

  // ─── Dashboard ─────────────────────────────────────
  @Get('stats')
  getDashboardStats(@Request() req: any) {
    return this.fsmService.getDashboardStats(req.user.tenantId);
  }

  // ─── Service Orders ────────────────────────────────
  @Post('service-orders')
  createServiceOrder(@Request() req: any, @Body() dto: CreateFsmServiceOrderDto) {
    return this.fsmService.createServiceOrder(req.user.tenantId, dto);
  }

  @Get('service-orders')
  findAllServiceOrders(@Request() req: any, @Query('status') status?: string) {
    return this.fsmService.findAllServiceOrders(req.user.tenantId, status);
  }

  @Get('service-orders/:id')
  findOneServiceOrder(@Request() req: any, @Param('id') id: string) {
    return this.fsmService.findOneServiceOrder(req.user.tenantId, id);
  }

  @Patch('service-orders/:id')
  updateServiceOrder(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateFsmServiceOrderDto) {
    return this.fsmService.updateServiceOrder(req.user.tenantId, id, dto);
  }

  @Delete('service-orders/:id')
  removeServiceOrder(@Request() req: any, @Param('id') id: string) {
    return this.fsmService.deleteServiceOrder(req.user.tenantId, id);
  }

  // ─── Appointments (Work Orders) ────────────────────
  @Get('work-orders/active')
  getActiveWorkOrders(@Request() req: any) {
    return this.fsmService.findActiveAppointments(req.user.tenantId);
  }

  @Post('appointments')
  createAppointment(@Request() req: any, @Body() dto: CreateFsmAppointmentDto) {
    return this.fsmService.createAppointment(req.user.tenantId, dto);
  }

  @Get('appointments')
  findAllAppointments(@Request() req: any) {
    return this.fsmService.findAllAppointments(req.user.tenantId);
  }

  @Patch('appointments/:id')
  updateAppointment(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateFsmAppointmentDto) {
    return this.fsmService.updateAppointment(req.user.tenantId, id, dto);
  }

  @Patch('appointments/:id/status')
  updateStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: any) {
    return this.fsmService.updateAppointmentStatus(req.user.tenantId, id, status);
  }

  // ─── Service Report ────────────────────────────────
  @Post('appointments/:id/report')
  createReport(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { summary: string; resolution: string },
  ) {
    return this.fsmService.createReport(req.user.tenantId, id, body.summary, body.resolution);
  }

  // ─── Master Data ───────────────────────────────────
  @Get('technicians')
  findTechnicians(@Request() req: any) {
    return this.fsmService.findTechnicians(req.user.tenantId);
  }
}
