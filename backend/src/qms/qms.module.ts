import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkflowModule } from '../workflow/workflow.module';
import { NcrController } from './ncr/ncr.controller';
import { NcrService } from './ncr/ncr.service';
import { CapaController } from './capa/capa.controller';
import { CapaService } from './capa/capa.service';
import { SupplierRatingController } from './supplier-rating/supplier-rating.controller';
import { SupplierRatingService } from './supplier-rating/supplier-rating.service';
import { QualityDocumentController } from './documents/quality-document.controller';
import { QualityDocumentService } from './documents/quality-document.service';
import { CalibrationController } from './calibration/calibration.controller';
import { CalibrationService } from './calibration/calibration.service';

@Module({
  imports: [PrismaModule, WorkflowModule],
  controllers: [NcrController, CapaController, SupplierRatingController, QualityDocumentController, CalibrationController],
  providers: [NcrService, CapaService, SupplierRatingService, QualityDocumentService, CalibrationService],
  exports: [NcrService, CapaService, SupplierRatingService, QualityDocumentService, CalibrationService],
})
export class QmsModule {}
// Force refresh routes
