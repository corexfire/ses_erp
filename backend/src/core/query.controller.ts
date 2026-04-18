import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('core/query')
export class QueryController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async query(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('table') table: string,
    @Query('include') include?: string,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
    @Query('search') search?: string,
    @Query('searchField') searchField?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    if (!table) {
      throw new BadRequestException('Table name is required');
    }

    // Convert PascalCase to camelCase
    // e.g. SalesQuotation -> salesQuotation
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);

    if (!(this.prisma as any)[modelName]) {
      throw new BadRequestException(`Model ${table} does not exist`);
    }

    const prismaInclude = include ? this.parseInclude(include) : undefined;
    const prismaTake = take ? parseInt(take, 10) : 100;
    const prismaSkip = skip ? parseInt(skip, 10) : 0;

    const where: any = { tenantId: req.user.tenantId! };
    
    // Simple Search Implementation
    if (search && searchField) {
       where[searchField] = { contains: search, mode: 'insensitive' };
    }

    // Dynamic OrderBy
    const orderBy: any = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    } else {
      // Default to ID desc if nothing provided (safer than createdAt)
      orderBy['id'] = 'desc';
    }

    try {
      const data = await (this.prisma as any)[modelName].findMany({
        where,
        include: prismaInclude,
        take: prismaTake,
        skip: prismaSkip,
        orderBy,
      });

      return { data };
    } catch (error: any) {
      throw new BadRequestException(`Query failed: ${error.message}`);
    }
  }

  private parseInclude(includeStr: string) {
    const result: any = {};
    const paths = includeStr.split(',').map((s) => s.trim());

    for (const path of paths) {
      let current = result;
      const segments = path.split('.');
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (i === segments.length - 1) {
          // If already an object (from earlier nested path), keep it
          if (typeof current[segment] !== 'object') {
            current[segment] = true;
          }
        } else {
          if (typeof current[segment] !== 'object') {
            current[segment] = { include: {} };
          } else if (!current[segment].include) {
            current[segment].include = {};
          }
          current = current[segment].include;
        }
      }
    }
    return result;
  }
}
