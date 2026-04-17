import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { EmployeeController, OrgStructureController, RecruitmentController } from './employee.controller';
import { TeamController } from './team.controller';
import { AttendanceController, ShiftController } from './attendance.controller';
import { PayrollController, ESSController } from './payroll.controller';
import { KpiController, ExpenseController } from './kpi-expense.controller';
import { HrisLmsController } from './lms/lms.controller';

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
  ],
})
export class HrisModule {}