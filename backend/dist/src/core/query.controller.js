"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let QueryController = class QueryController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async query(req, table, include, take, skip, search, searchField, sortField, sortOrder) {
        if (!table) {
            throw new common_1.BadRequestException('Table name is required');
        }
        const modelName = table.charAt(0).toLowerCase() + table.slice(1);
        if (!this.prisma[modelName]) {
            throw new common_1.BadRequestException(`Model ${table} does not exist`);
        }
        const prismaInclude = include ? this.parseInclude(include) : undefined;
        const prismaTake = take ? parseInt(take, 10) : 100;
        const prismaSkip = skip ? parseInt(skip, 10) : 0;
        const where = { tenantId: req.user.tenantId };
        if (search && searchField) {
            where[searchField] = { contains: search, mode: 'insensitive' };
        }
        const orderBy = {};
        if (sortField) {
            orderBy[sortField] = sortOrder || 'asc';
        }
        else {
            orderBy['id'] = 'desc';
        }
        try {
            const data = await this.prisma[modelName].findMany({
                where,
                include: prismaInclude,
                take: prismaTake,
                skip: prismaSkip,
                orderBy,
            });
            return { data };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Query failed: ${error.message}`);
        }
    }
    parseInclude(includeStr) {
        const result = {};
        const paths = includeStr.split(',').map((s) => s.trim());
        for (const path of paths) {
            let current = result;
            const segments = path.split('.');
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                if (i === segments.length - 1) {
                    if (typeof current[segment] !== 'object') {
                        current[segment] = true;
                    }
                }
                else {
                    if (typeof current[segment] !== 'object') {
                        current[segment] = { include: {} };
                    }
                    else if (!current[segment].include) {
                        current[segment].include = {};
                    }
                    current = current[segment].include;
                }
            }
        }
        return result;
    }
};
exports.QueryController = QueryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('table')),
    __param(2, (0, common_1.Query)('include')),
    __param(3, (0, common_1.Query)('take')),
    __param(4, (0, common_1.Query)('skip')),
    __param(5, (0, common_1.Query)('search')),
    __param(6, (0, common_1.Query)('searchField')),
    __param(7, (0, common_1.Query)('sortField')),
    __param(8, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], QueryController.prototype, "query", null);
exports.QueryController = QueryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('core/query'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QueryController);
//# sourceMappingURL=query.controller.js.map