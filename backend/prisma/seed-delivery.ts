import type { PrismaClient } from './generated/client';
import { randomBytes } from 'crypto';

export async function seedDelivery(prisma: PrismaClient, tenantId: string) {
  // 1. Ensure Dependencies Exist (Master Data Helper)
  
  // 1.1 Warehouses
  let warehouses = await prisma.warehouse.findMany({ where: { tenantId } });
  if (warehouses.length === 0) {
    console.log('🌱 Seeding fallback Warehouses for Delivery...');
    const whData = [
      { code: 'WH-JKT-01', name: 'Gudang Utama Jakarta' },
      { code: 'WH-SBY-01', name: 'Gudang Hub Surabaya' },
    ];
    for (const wh of whData) {
      const created = await prisma.warehouse.create({
        data: { tenantId, ...wh, isActive: true }
      });
      warehouses.push(created);
    }
  }

  // 1.2 Customers
  let customers = await prisma.customer.findMany({ where: { tenantId } });
  if (customers.length === 0) {
    console.log('🌱 Seeding fallback Customers for Delivery...');
    const custData = [
      { code: 'CUST-001', name: 'PT. Retail Sejahtera', email: 'procurement@retailsejahtera.id', address1: 'Jl. Sudirman No. 1, Jakarta' },
      { code: 'CUST-002', name: 'CV. Maju Jaya Logistik', email: 'ops@majujaya.test', address1: 'Jl. Ahmad Yani No. 50, Surabaya' },
      { code: 'CUST-003', name: 'IndoMarket Group', email: 'dc@indomarket.id', address1: 'Kawasan Industri Jababeka' },
    ];
    for (const c of custData) {
      const created = await prisma.customer.create({
        data: { tenantId, ...c }
      });
      customers.push(created);
    }
  }

  // 1.3 Items
  let items = await prisma.item.findMany({ where: { tenantId } });
  if (items.length === 0) {
    console.log('🌱 Seeding fallback Items for Delivery...');
    const itemData = [
      { code: 'SKU-LOG-001', name: 'Kardus Karton A4', uomCode: 'PCS', unitPrice: 5000 },
      { code: 'SKU-LOG-002', name: 'Pallet Kayu Standar', uomCode: 'PCS', unitPrice: 150000 },
      { code: 'SKU-LOG-003', name: 'Stretch Film 50cm', uomCode: 'ROLL', unitPrice: 85000 },
    ];
    for (const i of itemData) {
      const created = await prisma.item.create({
        data: { tenantId, ...i, isActive: true }
      });
      items.push(created);
    }
  }

  const tripPlans = await prisma.tripPlan.findMany({ where: { tenantId } });
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const deliveryScenarios = [
    // PLANNED
    { code: `DO-${today}-0001`, status: 'PLANNED', customer: customers[0], warehouse: warehouses[0], priority: 'NORMAL' },
    { code: `DO-${today}-0002`, status: 'PLANNED', customer: customers[1 % customers.length], warehouse: warehouses[0], priority: 'HIGH' },
    
    // RELEASED
    { code: `DO-${today}-0003`, status: 'RELEASED', customer: customers[2 % customers.length], warehouse: warehouses[0], priority: 'URGENT' },
    
    // IN_TRANSIT
    { 
      code: `DO-${today}-0004`, 
      status: 'IN_TRANSIT', 
      customer: customers[0], 
      warehouse: warehouses[0], 
      priority: 'NORMAL',
      tripPlan: tripPlans[0], 
      actualShipDate: new Date(),
    },
    { 
      code: `DO-${today}-0005`, 
      status: 'IN_TRANSIT', 
      customer: customers[1 % customers.length], 
      warehouse: warehouses[0], 
      priority: 'HIGH',
      tripPlan: tripPlans[1 % tripPlans.length],
      actualShipDate: new Date(),
    },

    // DELIVERED
    { 
      code: `DO-${today}-0006`, 
      status: 'DELIVERED', 
      customer: customers[2 % customers.length], 
      warehouse: warehouses[0], 
      priority: 'NORMAL',
      actualShipDate: new Date(Date.now() - 86400000),
      actualDeliveredAt: new Date(Date.now() - 80000000),
      pod: { receivedBy: 'Agus Santoso', notes: 'Diterima dalam kondisi baik' }
    },
    { 
      code: `DO-${today}-0007`, 
      status: 'DELIVERED', 
      customer: customers[0], 
      warehouse: warehouses[1 % warehouses.length], 
      priority: 'NORMAL',
      actualShipDate: new Date(Date.now() - 172800000),
      actualDeliveredAt: new Date(Date.now() - 160000000),
      pod: { receivedBy: 'Ibu Ratna', notes: 'Sesuai pesanan' }
    },

    // FAILED
    { 
      code: `DO-${today}-0008`, 
      status: 'FAILED', 
      customer: customers[1 % customers.length], 
      warehouse: warehouses[0], 
      priority: 'HIGH',
      deliveryNotes: 'Alamat tidak ditemukan / Pagar terkunci',
    },

    // CANCELED
    { code: `DO-${today}-0009`, status: 'CANCELED', customer: customers[2 % customers.length], warehouse: warehouses[0] },
  ];

  for (const s of deliveryScenarios) {
    const podToken = randomBytes(32).toString('hex');
    const podTokenExpiry = new Date();
    podTokenExpiry.setDate(podTokenExpiry.getDate() + 7);

    const deliveryOrder = await prisma.deliveryOrder.upsert({
      where: { tenantId_code: { tenantId, code: s.code } },
      update: {
        status: s.status as any,
        tripPlanId: (s as any).tripPlan?.id || null,
      },
      create: {
        tenantId,
        code: s.code,
        status: s.status as any,
        priority: (s as any).priority as any || 'NORMAL',
        customerId: s.customer.id,
        warehouseId: s.warehouse.id,
        tripPlanId: (s as any).tripPlan?.id,
        plannedShipDate: new Date(),
        actualShipDate: (s as any).actualShipDate,
        actualDeliveredAt: (s as any).actualDeliveredAt,
        deliveryAddress1: s.customer.address1 || 'Jl. Mangga Dua No. 12',
        deliveryCity: s.customer.city || 'Jakarta Pusat',
        deliveryNotes: (s as any).deliveryNotes,
        podToken,
        podTokenExpiry,
      },
    });

    // Seed Items if new
    const existingItems = await prisma.deliveryOrderItem.count({ where: { deliveryOrderId: deliveryOrder.id } });
    if (existingItems === 0) {
      const numItems = 2 + Math.floor(Math.random() * 3);
      for (let i = 1; i <= numItems; i++) {
        const item = items[Math.floor(Math.random() * items.length)];
        const qty = 5 + Math.floor(Math.random() * 50);
        await prisma.deliveryOrderItem.create({
          data: {
            tenantId,
            deliveryOrderId: deliveryOrder.id,
            lineNo: i,
            itemId: item?.id,
            description: item?.name || `Barang Logistik ${i}`,
            orderedQty: qty,
            shippedQty: s.status === 'DELIVERED' || s.status === 'IN_TRANSIT' ? qty : 0,
            deliveredQty: s.status === 'DELIVERED' ? qty : 0,
            uomCode: item?.uomCode || 'PCS',
            unitPrice: item?.unitPrice || 15000,
          }
        });
      }
    }

    // Seed POD if delivered
    if (s.status === 'DELIVERED' && (s as any).pod) {
       await prisma.proofOfDelivery.upsert({
         where: { deliveryOrderId: deliveryOrder.id },
         update: {},
         create: {
           tenantId,
           deliveryOrderId: deliveryOrder.id,
           receivedBy: (s as any).pod.receivedBy,
           receivedAt: (s as any).actualDeliveredAt || new Date(),
           notes: (s as any).pod.notes,
           status: 'CAPTURED',
         }
       });
    }
  }

  console.log(`Seeded Logistics Delivery: ${deliveryScenarios.length} orders with various states`);
}
