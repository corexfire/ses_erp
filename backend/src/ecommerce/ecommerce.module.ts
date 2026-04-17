import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace/marketplace.controller';
import { MarketplaceChannelController } from './marketplace/marketplace-channel.controller';
import { MarketplaceSyncController } from './marketplace/marketplace-sync.controller';
import { AuditService } from '../audit/audit.service';

@Module({
  providers: [AuditService],
  controllers: [
    MarketplaceController,
    MarketplaceChannelController,
    MarketplaceSyncController,
  ],
  exports: [],
})
export class EcommerceModule {}
