import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/lms')
export class HrisLmsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('courses')
  async getCourses(@Req() req: FastifyRequest, @Query('search') search?: string) {
    const user = req.user as AuthUser;
    
    const where: any = { tenantId: user.tenantId };
    
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const courses = await this.prisma.course.findMany({
      where,
      include: {
         _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // We get global pass rate dynamically across all enrollments
    const enrollmentsAgg = await this.prisma.courseEnrollment.groupBy({
       by: ['status'],
       _count: { status: true },
       where: { tenantId: user.tenantId }
    });
    
    const countEnrolled = enrollmentsAgg.reduce((sum, item) => sum + (item._count?.status || 0), 0);
    const countCompleted = enrollmentsAgg.find(e => e.status === 'COMPLETED')?._count?.status || 0;
    const countFailed = enrollmentsAgg.find(e => e.status === 'FAILED')?._count?.status || 0;

    const summary = {
       totalCourses: courses.length,
       totalEnrollments: countEnrolled,
       completionRate: countEnrolled ? (countCompleted / countEnrolled) * 100 : 0,
       failedCount: countFailed
    };

    return { data: courses, summary };
  }

  @Get('enrollments')
  async getEnrollments(@Req() req: FastifyRequest, @Query('courseId') courseId?: string) {
    const user = req.user as AuthUser;
    const where: any = { tenantId: user.tenantId };
    if (courseId) {
        where.courseId = courseId;
    }

    const payload = await this.prisma.courseEnrollment.findMany({
        where,
        include: {
            employee: { select: { firstName: true, lastName: true, employeeNo: true, department: true } },
            course: { select: { title: true, code: true } }
        },
        orderBy: { enrolledAt: 'desc' }
    });

    return { data: payload };
  }

  @Post('course')
  async createCourse(@Req() req: FastifyRequest, @Body() body: any) {
     const user = req.user as AuthUser;
     const code = body.code || `CRS-${Date.now().toString().slice(-6)}`;
     
     const created = await this.prisma.course.create({
         data: {
             tenantId: user.tenantId,
             code,
             title: body.title,
             description: body.description || '',
             durationHours: Number(body.durationHours) || 1,
             mandatory: Boolean(body.mandatory),
             category: body.category || 'TECHNICAL',
             status: body.status || 'ACTIVE'
         }
     });

     await this.audit.log(user.tenantId, user.id, 'CREATE', 'Course', created.id, null, created);
     return { message: 'Training Course registered successfully', data: created };
  }

  @Post('enroll')
  async enrollEmployee(@Req() req: FastifyRequest, @Body() body: any) {
    const user = req.user as AuthUser;
    
    // Evaluate status safely
    let score = null;
    let completedAt = null;
    let status = body.status || 'ENROLLED';

    if (body.score !== undefined && body.score !== '') {
        score = Number(body.score);
        if (score >= 70) {
            status = 'COMPLETED';
            completedAt = new Date();
        } else if (score < 70 && status !== 'IN_PROGRESS') {
            status = 'FAILED';
            completedAt = new Date();
        }
    }

    let record;
    if (body.id) {
       // Updating existing enrollment (Grading/Scoring)
       record = await this.prisma.courseEnrollment.update({
           where: { id: body.id },
           data: {
               status, score, completedAt, notes: body.notes
           }
       });
    } else {
       // Fresh enrollment
       record = await this.prisma.courseEnrollment.create({
         data: {
           tenantId: user.tenantId,
           courseId: body.courseId,
           employeeId: body.employeeId,
           status,
           score,
           completedAt,
           notes: body.notes
         },
       });
    }

    return { message: 'Enrollment process success.', data: record };
  }

  @Get('lookups')
  async getLookups(@Req() req: FastifyRequest) {
    const user = req.user as AuthUser;
    const employees = await this.prisma.employee.findMany({
      where: { tenantId: user.tenantId, status: 'ACTIVE' },
      select: { id: true, firstName: true, lastName: true, employeeNo: true }
    });
    return { data: { employees } };
  }
}
