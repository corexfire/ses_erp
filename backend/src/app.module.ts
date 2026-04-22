import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuditService } from './audit/audit.service';
import { CoreModule } from './core/core.module';
import { CrmModule } from './crm/crm.module';
import { SalesModule } from './sales/sales.module';
import { ProcurementModule } from './procurement/procurement.module';
import { InventoryModule } from './inventory/inventory.module';
import { ManufacturingModule } from './manufacturing/manufacturing.module';
import { FinanceModule } from './finance/finance.module';
import { HrisModule } from './hris/hris.module';
import { LogisticsModule } from './logistics/logistics.module';
import { ProjectModule } from './project/project.module';
import { WorkflowModule } from './workflow/workflow.module';
import { NotificationModule } from './notification/notification.module';
import { RentalModule } from './rental/rental.module';
import { QmsModule } from './qms/qms.module';
import { FsmModule } from './fsm/fsm.module';
import { ConstructionModule } from './construction/construction.module';
import { SupportModule } from './support/support.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { PosModule } from './pos/pos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CoreModule,
    CrmModule,
    SalesModule,
    ProcurementModule,
    InventoryModule,
    ManufacturingModule,
    FinanceModule,
    HrisModule,
    LogisticsModule,
    ProjectModule,
    WorkflowModule,
    NotificationModule,
    RentalModule,
    QmsModule,
    FsmModule,
    ConstructionModule,
    SupportModule,
    EcommerceModule,
    PosModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuditService],
})
export class AppModule {}
