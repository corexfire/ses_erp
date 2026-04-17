import { Module } from '@nestjs/common';
import { FsmService } from './fsm.service';
import { FsmController } from './fsm.controller';
import { PrismaModule } from '../prisma/prisma.module';

import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';
import { HandoverService } from './handover.service';
import { HandoverController } from './handover.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FsmController, SparePartsController, HandoverController],
  providers: [FsmService, SparePartsService, HandoverService],
  exports: [FsmService, SparePartsService, HandoverService],
})
export class FsmModule {}
