import { Module } from '@nestjs/common';
import { ConstructionController } from './construction.controller';
import { MaterialRequestController } from './material-request.controller';
import { SubcontractorController } from './subcontractor.controller';
import { DailyProgressController } from './daily-progress.controller';
import { DrawingController } from './drawing.controller';
import { HseController } from './hse.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationModule } from '../notification/notification.module';

import { ConstructionExpansionController } from './expansion.controller';

@Module({
  imports: [NotificationModule],
  controllers: [
    ConstructionController, 
    MaterialRequestController, 
    SubcontractorController, 
    DailyProgressController, 
    DrawingController, 
    HseController,
    ConstructionExpansionController
  ],
  providers: [PrismaService],
})
export class ConstructionModule {}
