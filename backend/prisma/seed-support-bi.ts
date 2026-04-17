import { PrismaClient } from './generated';

export async function seedSupportBi(prisma: PrismaClient, tenantId: string) {
  console.log('--- SEEDING SUPPORT BI (METRICS & KPIS) ---');

  const metricTemplates = [
    {
      code: 'ASSET_AVAILABILITY',
      name: 'Asset Operational Availability',
      category: 'ASSET',
      unit: 'PERCENT',
      targetValue: 95,
      actuals: { '2024-Q1': 92.5, '2024-Q2': 94.2, '2024-Q3': 95.8, '2024-Q4': 96.1 }
    },
    {
      code: 'COMPLIANCE_HEALTH',
      name: 'Regulatory Compliance Index',
      category: 'COMPLIANCE',
      unit: 'PERCENT',
      targetValue: 80,
      actuals: { '2024-Q1': 70, '2024-Q2': 75.5, '2024-Q3': 82.3, '2024-Q4': 85.0 }
    },
    {
      code: 'DOC_FRESHNESS',
      name: 'Document Version Freshness',
      category: 'DOCUMENT',
      unit: 'PERCENT',
      targetValue: 90,
      actuals: { '2024-Q1': 85, '2024-Q2': 88, '2024-Q3': 91, '2024-Q4': 92 }
    },
    {
      code: 'MAINTENANCE_SLA',
      name: 'Maintenance SLA Adherence',
      category: 'ASSET',
      unit: 'PERCENT',
      targetValue: 85,
      actuals: { '2024-Q1': 78, '2024-Q2': 81, '2024-Q3': 86, '2024-Q4': 88 }
    },
    {
      code: 'SAFETY_INCIDENT_RATE',
      name: 'Safe Operation Index',
      category: 'HSE',
      unit: 'PERCENT',
      targetValue: 100,
      actuals: { '2024-Q1': 100, '2024-Q2': 98.5, '2024-Q3': 100, '2024-Q4': 100 }
    },
    {
      code: 'ASSET_UTILIZATION',
      name: 'Strategic Asset Utilization',
      category: 'ASSET',
      unit: 'PERCENT',
      targetValue: 75,
      actuals: { '2024-Q1': 68, '2024-Q2': 72, '2024-Q3': 76, '2024-Q4': 78 }
    }
  ];

  for (const template of metricTemplates) {
    for (const [period, actual] of Object.entries(template.actuals)) {
      const status = actual >= template.targetValue ? 'ON_TRACK' : 
                     actual >= template.targetValue * 0.9 ? 'AT_RISK' : 'BEHIND';
      
      await prisma.supportKpi.upsert({
        where: {
          tenantId_code_period: {
            tenantId,
            code: template.code,
            period
          }
        },
        update: {
          actualValue: actual,
          targetValue: template.targetValue,
          status
        },
        create: {
          tenantId,
          code: template.code,
          name: template.name,
          category: template.category,
          period,
          unit: template.unit,
          targetValue: template.targetValue,
          actualValue: actual,
          status,
          notes: `Metric tracking for ${period}`
        }
      });
    }
  }

  console.log('--- SUPPORT BI SEEDING COMPLETED ---');
}
