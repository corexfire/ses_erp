import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { AuditService } from '../audit/audit.service';

@Module({
  providers: [AuditService],
  controllers: [PosController],
  exports: [],
})
export class PosModule {}