"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrisModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const employee_controller_1 = require("./employee.controller");
const team_controller_1 = require("./team.controller");
const attendance_controller_1 = require("./attendance.controller");
const payroll_controller_1 = require("./payroll.controller");
const kpi_expense_controller_1 = require("./kpi-expense.controller");
const lms_controller_1 = require("./lms/lms.controller");
let HrisModule = class HrisModule {
};
exports.HrisModule = HrisModule;
exports.HrisModule = HrisModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            employee_controller_1.EmployeeController,
            employee_controller_1.OrgStructureController,
            team_controller_1.TeamController,
            employee_controller_1.RecruitmentController,
            attendance_controller_1.AttendanceController,
            attendance_controller_1.ShiftController,
            payroll_controller_1.PayrollController,
            payroll_controller_1.ESSController,
            kpi_expense_controller_1.KpiController,
            kpi_expense_controller_1.ExpenseController,
            lms_controller_1.HrisLmsController,
        ],
    })
], HrisModule);
//# sourceMappingURL=hris.module.js.map