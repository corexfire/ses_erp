import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { EmployeeController, OrgStructureController, RecruitmentController } from './employee.controller';
import { TeamController } from './team.controller';
import { AttendanceController, ShiftController } from './attendance.controller';
import { PayrollController, ESSController } from './payroll.controller';
import { KpiController, ExpenseController } from './kpi-expense.controller';
import { HrisLmsController } from './lms/lms.controller';
import { HrisWorkflowController } from './workflow.controller';
import { HrisFinancialController } from './financial.controller';
import { HrisProductivityController } from './productivity.controller';
import { HrisAnalyticsController } from './analytics.controller';
import { SuccessionController } from './succession.controller';

@Module({
  providers: [AuditService],
  controllers: [
    EmployeeController,
    OrgStructureController,
    TeamController,
    RecruitmentController,
    AttendanceController,
    ShiftController,
    PayrollController,
    ESSController,
    KpiController,
    ExpenseController,
    HrisLmsController,
    HrisWorkflowController,
    HrisFinancialController,
    HrisProductivityController,
    HrisAnalyticsController,
    SuccessionController,
  ],
})
export class HrisModule {}