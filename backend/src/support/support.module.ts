import { Module } from '@nestjs/common';
import { AssetSupportController } from './asset.controller';
import { SupportDocumentController } from './document.controller';
import { SupportComplianceController } from './compliance.controller';
import { SupportBiController } from './bi.controller';
import { SupportSustainabilityController } from './sustainability.controller';

@Module({
  controllers: [
    SupportBiController, 
    SupportComplianceController, 
    AssetSupportController, 
    SupportDocumentController,
    SupportSustainabilityController
  ],
})
export class SupportModule {}
