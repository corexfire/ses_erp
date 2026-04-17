import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function seedEnterpriseFull(prismaInstance: PrismaClient, tenantId: string) {
  console.log('🚀 --- STARTING COMPREHENSIVE ENTERPRISE DATA SEEDING (MASTER STORY) ---');

  // 1. SHARED CONSTANTS & PRE-REQUISITES
  const warehouse = await prismaInstance.warehouse.findFirst({ where: { tenantId } });
  const ppn11 = await prismaInstance.taxCode.findFirst({ where: { tenantId, code: 'PPN-11' } });
  const idr = await prismaInstance.currency.findFirst({ where: { tenantId, code: 'IDR' } });
  
  if (!warehouse || !idr) {
    console.error('❌ Essential Master Data (Warehouse/Currency) missing. Seed aborted.');
    return;
  }

  // 2. ITEM MASTER DATA (Integrated Story)
  console.log('📦 Seeding Item Master Data...');
  const itemsData = [
    { code: 'RM-CB-001', name: 'Arabica Kintamani Beans (1kg)', type: 'MATERIAL', uom: 'KG' },
    { code: 'RM-MK-001', name: 'Full Cream Milk (1L)', type: 'MATERIAL', uom: 'LTR' },
    { code: 'RM-AR-001', name: 'Organic Gula Aren (1kg)', type: 'MATERIAL', uom: 'KG' },
    { code: 'RM-CP-001', name: 'Eco-Friendly Bottle (250ml)', type: 'MATERIAL', uom: 'PCS' },
    { code: 'SA-ESP-001', name: 'Classic Espresso Base (10L)', type: 'SEMI_FINISHED', uom: 'LTR' },
    { code: 'FG-COF-001', name: 'Signature Aren Latte (250ml Bottle)', type: 'PRODUCT', uom: 'PCS' },
  ];

  const itemMap: Record<string, string> = {};
  for (const it of itemsData) {
    const item = await prismaInstance.item.upsert({
      where: { tenantId_code: { tenantId, code: it.code } },
      update: {},
      create: {
        tenantId,
        code: it.code,
        name: it.name,
        baseUomCode: it.uom,
        isActive: true,
        isPurchaseItem: it.type === 'MATERIAL',
        isSalesItem: it.type === 'PRODUCT',
      }
    });
    itemMap[it.code] = item.id;
  }

  // 3. MASTER ENTITIES
  console.log('🏢 Seeding Suppliers & Customers...');
  const supplier = await prismaInstance.supplier.upsert({
    where: { tenantId_code: { tenantId, code: 'VEND-AGRO-01' } },
    update: {},
    create: {
      tenantId, code: 'VEND-AGRO-01', name: 'Agro Jati Makmur', email: 'sales@agrojati.id',
      city: 'Bandung', npwp: '01.999.888.7-001.000'
    }
  });

  const customer = await prismaInstance.customer.upsert({
    where: { tenantId_code: { tenantId, code: 'CUST-RETAIL-01' } },
    update: {},
    create: {
      tenantId, code: 'CUST-RETAIL-01', name: 'Alfamart Group - West', email: 'procurement@alfamart.co.id',
      city: 'Tangerang', npwp: '02.111.222.3-002.000'
    }
  });

  // 3.5 INITIAL INVENTORY / STOCK BALANCES
  console.log('📦 Seeding Initial Stock Balances...');
  const balanceItems = [
    { itemId: itemMap['RM-CB-001'], qty: 500, uomCode: 'KG' },
    { itemId: itemMap['RM-MK-001'], qty: 500, uomCode: 'LTR' },
    { itemId: itemMap['RM-AR-001'], qty: 500, uomCode: 'KG' },
    { itemId: itemMap['RM-CP-001'], qty: 10000, uomCode: 'PCS' },
    { itemId: itemMap['FG-COF-001'], qty: 1000, uomCode: 'BTL' }
  ];

  if (warehouse) {
    await prismaInstance.stockLedger.deleteMany({
      where: { tenantId, warehouseId: warehouse.id, refType: 'OPENING_BALANCE' }
    });

    for (const b of balanceItems) {
      if (!b.itemId) continue;
      const existingObj = await prismaInstance.stockBalance.findFirst({
        where: { tenantId, warehouseId: warehouse.id, itemId: b.itemId }
      });
      if (!existingObj) {
        await prismaInstance.stockBalance.create({
          data: {
            tenantId, warehouseId: warehouse.id, itemId: b.itemId,
            qtyOnHand: b.qty, qtyAvailable: b.qty, uomCode: b.uomCode
          }
        });
      } else {
        await prismaInstance.stockBalance.update({
          where: { id: existingObj.id },
          data: { qtyOnHand: b.qty, qtyAvailable: b.qty }
        });
      }

      await prismaInstance.stockLedger.create({
        data: {
          tenantId,
          warehouseId: warehouse.id,
          itemId: b.itemId,
          moveType: 'MANUAL_ADJUST',
          refType: 'OPENING_BALANCE',
          refId: 'SYS-INIT',
          postingDate: new Date('2024-01-01'),
          description: 'Opening Balance Seeding',
          qtyIn: b.qty,
          qtyOut: 0,
          uomCode: b.uomCode,
          unitCost: b.itemId === itemMap['FG-COF-001'] ? 18000 : 50000
        }
      });
    }
  }

  // 4. CRM PHASE (Story: Finding Leads & Opportunities)
  console.log('📈 Seeding CRM & Sales Pipeline Flow...');
  const campaign = await prismaInstance.marketingCampaign.upsert({
    where: { tenantId_code: { tenantId, code: 'CMP-2024-EXPO' } },
    update: {},
    create: {
      tenantId, code: 'CMP-2024-EXPO', name: 'Bali International Coffee Expo 2024',
      channel: 'Offline / Event', status: 'COMPLETED', budget: 150000000,
      startDate: new Date('2024-01-01'), endDate: new Date('2024-01-05')
    }
  });

  const lead = await prismaInstance.lead.upsert({
    where: { tenantId_code: { tenantId, code: 'LD-2024-001' } },
    update: {},
    create: {
      tenantId, code: 'LD-2024-001', name: 'Budi Santoso (Indo Hotel Group)',
      email: 'budi@indohotel.com', phone: '08123456789', source: 'Website / Expo',
      status: 'QUALIFIED'
    }
  });

  const admin = await prismaInstance.user.findFirst({ where: { tenantId } });

  // Pipeline Stage: Qualification
  await prismaInstance.opportunity.upsert({
    where: { tenantId_code: { tenantId, code: 'OPP-2024-001' } },
    update: {},
    create: {
      tenantId, code: 'OPP-2024-001', name: 'Peluang Mesin Espresso - Retail Store',
      stage: 'QUALIFICATION', expectedValue: 45000000,
      leadId: lead.id, ownerUserId: admin?.id,
      notes: 'Calon pelanggan butuh solusi kopi otomatis.'
    }
  });

  // Pipeline Stage: Negotiation
  await prismaInstance.opportunity.upsert({
    where: { tenantId_code: { tenantId, code: 'OPP-2024-002' } },
    update: {},
    create: {
      tenantId, code: 'OPP-2024-002', name: 'Kerjasama Supply Latte Regional',
      stage: 'NEGOTIATION', expectedValue: 250000000,
      customerId: customer.id, ownerUserId: admin?.id,
      notes: 'Sedang penyesuaian harga volume.'
    }
  });

  // Pipeline Stage: Closed Won (Linked to later SO story)
  const wonOpp = await prismaInstance.opportunity.upsert({
    where: { tenantId_code: { tenantId, code: 'OPP-2024-003' } },
    update: {},
    create: {
      tenantId, code: 'OPP-2024-003', name: 'Signature Aren Latte - Batch Initial',
      stage: 'CLOSED_WON', expectedValue: 12500000,
      customerId: customer.id, ownerUserId: admin?.id,
      closeDate: new Date('2024-02-10')
    }
  });

  // Sales Activity
  const existingAct = await prismaInstance.salesActivity.findFirst({
    where: { tenantId, subject: 'Presentasi Katalog & Testing Rasa', opportunityId: wonOpp.id }
  });
  if (!existingAct) {
    await prismaInstance.salesActivity.create({
      data: {
        tenantId, type: 'MEETING', subject: 'Presentasi Katalog & Testing Rasa',
        status: 'DONE', opportunityId: wonOpp.id, assignedToId: admin?.id,
        notes: 'Pelanggan puas dengan rasa Signature Aren Latte.'
      }
    });
  }

  // 5. PROCUREMENT PHASE (Story: Buying Raw Materials)
  console.log('🛒 Seeding Procurement Transactional Flow...');

  const prCode = 'PR-2024-ENT-001';
  await prismaInstance.purchaseRequisition.upsert({
    where: { tenantId_code: { tenantId, code: prCode } },
    update: {},
    create: {
      tenantId, code: prCode,
      requestDate: new Date('2024-01-02'),
      status: 'APPROVED',
      notes: 'Quarterly material stockpile',
      department: 'Production',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk', qty: 100, estimatedPrice: 120000, requiredDate: new Date('2024-01-20'), uomCode: 'KG' },
          { tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'], description: 'Premium Aren Pulverized', qty: 50, estimatedPrice: 45000, requiredDate: new Date('2024-01-20'), uomCode: 'KG' }
        ]
      }
    } as any
  });

  const rfqCode = 'RFQ-2024-ENT-001';
  const rfq = await prismaInstance.rfq.upsert({
    where: { tenantId_code: { tenantId, code: rfqCode } },
    update: {},
    create: {
      tenantId, code: rfqCode,
      issueDate: new Date('2024-01-05'),
      closingDate: new Date('2024-01-12'),
      status: 'CLOSED',
      department: 'Production',
      title: 'Q1 Material Sourcing',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk', qty: 100, uomCode: 'KG', targetPrice: 120000 },
          { tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'], description: 'Premium Aren Pulverized', qty: 50, uomCode: 'KG', targetPrice: 45000 }
        ]
      },
      vendors: {
        create: [
          { tenantId, supplierId: supplier.id, bidAmount: 14250000, status: 'AWARDED', notes: 'Best price overall' }
        ]
      }
    } as any
  });

  const poCode = 'PO-2024-ENT-001';
  const purchaseOrder = await prismaInstance.purchaseOrder.upsert({
    where: { tenantId_code: { tenantId, code: poCode } },
    update: {},
    create: {
      tenantId, code: poCode,
      supplierId: supplier.id,
      rfqId: rfq.id,
      orderDate: new Date('2024-01-15'),
      status: 'APPROVED',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk', qty: 100, unitPrice: 120000, taxCodeId: ppn11?.id },
          { tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'], description: 'Premium Aren Pulverized', qty: 50, unitPrice: 45000, taxCodeId: ppn11?.id }
        ]
      }
    }
  });

  const grnCode = 'GRN-2024-ENT-001';
  const grn = await prismaInstance.goodsReceiptNote.upsert({
    where: { tenantId_code: { tenantId, code: grnCode } },
    update: {},
    create: {
      tenantId, code: grnCode,
      supplierId: supplier.id,
      purchaseOrderId: purchaseOrder.id,
      receiptDate: new Date('2024-01-20'),
      status: 'POSTED',
      warehouseId: warehouse.id,
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk', qty: 100, uomCode: 'KG', warehouseId: warehouse.id },
          { tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'], description: 'Premium Aren Pulverized', qty: 50, uomCode: 'KG', warehouseId: warehouse.id }
        ]
      }
    } as any
  });

  const apInvoiceCode = 'PINV-2024-ENT-001';
  const apInvoice = await prismaInstance.purchaseInvoice.upsert({
    where: { tenantId_code: { tenantId, code: apInvoiceCode } },
    update: {},
    create: {
      tenantId, code: apInvoiceCode,
      supplierId: supplier.id,
      orderId: purchaseOrder.id,
      invoiceDate: new Date('2024-01-22'),
      status: 'APPROVED',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk', qty: 100, unitPrice: 120000, taxCodeId: ppn11?.id },
          { tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'], description: 'Premium Aren Pulverized', qty: 50, unitPrice: 45000, taxCodeId: ppn11?.id }
        ]
      }
    } as any
  });

  const twmCode = 'TWM-2024-ENT-001';
  await prismaInstance.threeWayMatching.upsert({
    where: { tenantId_code: { tenantId, code: twmCode } },
    update: {},
    create: {
      tenantId, code: twmCode,
      invoiceId: apInvoice.id,
      orderId: purchaseOrder.id,
      receiptId: grn.id,
      status: 'MATCHED',
      varianceAmount: 0,
      discrepancyNotes: 'Perfect match confirmed by master orchestrator.'
    }
  });
  const landedCostCode = 'LCV-2024-ENT-001';
  await prismaInstance.landedCostVoucher.upsert({
    where: { tenantId_code: { tenantId, code: landedCostCode } },
    update: {},
    create: {
      tenantId, code: landedCostCode,
      costDate: new Date('2024-01-21'),
      totalAmount: 5000000, 
      apportionmentMethod: 'qty',
      receiptId: grn.id,
      status: 'APPROVED',
      notes: 'Freight and handling charges from seaport customs to central warehouse.',
      allocations: {
        create: [
          { tenantId, lineNo: 1, costComponent: 'Freight & Customs', amount: 3333333.3333, itemId: itemMap['RM-CB-001'], receiptLineNo: 1 },
          { tenantId, lineNo: 2, costComponent: 'Freight & Customs', amount: 1666666.6667, itemId: itemMap['RM-AR-001'], receiptLineNo: 2 }
        ]
      }
    } as any
  });

  const prtCode = 'PRT-2024-ENT-001';
  await prismaInstance.purchaseReturn.upsert({
    where: { tenantId_code: { tenantId, code: prtCode } },
    update: {},
    create: {
      tenantId, code: prtCode,
      supplierId: supplier.id,
      orderId: purchaseOrder.id,
      invoiceId: apInvoice.id,
      receiptId: grn.id,
      returnDate: new Date('2024-01-25'),
      status: 'APPROVED',
      reason: 'Moisture detected during incoming QC',
      notes: 'Returning 5 KG of damaged Kintamani Beans',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk (Damaged)', qty: 5, uomCode: 'KG', unitPrice: 120000, taxCodeId: ppn11?.id, receiptLineNo: 1 }
        ]
      }
    } as any
  });

  // 5. MANUFACTURING PHASE (Story: Production of FG)
  console.log('🏭 Seeding Manufacturing Flow...');
  const bomCode = 'BOM-AR-001';
  const bom = await prismaInstance.billOfMaterials.upsert({
    where: { tenantId_code: { tenantId, code: bomCode } },
    update: {},
    create: {
      tenantId, code: bomCode, name: 'BOM Signature Aren Latte',
      itemId: itemMap['FG-COF-001'],
      baseQty: 100, // Makes 100 bottles
      isMain: true,
      items: {
        create: [
          { tenantId, lineNo: 1, componentItemId: itemMap['RM-CB-001'], qty: 2.5, uomCode: 'KG' },
          { tenantId, lineNo: 2, componentItemId: itemMap['RM-MK-001'], qty: 20, uomCode: 'LTR' },
          { tenantId, lineNo: 3, componentItemId: itemMap['RM-AR-001'], qty: 1.5, uomCode: 'KG' },
          { tenantId, lineNo: 4, componentItemId: itemMap['RM-CP-001'], qty: 100, uomCode: 'PCS' },
        ]
      }
    }
  });

  const woCode = 'WO-2024-001';
  await prismaInstance.workOrder.upsert({
    where: { tenantId_code: { tenantId, code: woCode } },
    update: {},
    create: {
      tenantId, code: woCode,
      bomId: bom.id,
      finishedGoodItemId: itemMap['FG-COF-001'],
      qtyPlanned: 1000,
      qtyProduced: 1000,
      status: 'COMPLETED',
      warehouseId: warehouse.id,
      actualStartDate: new Date('2024-02-01'),
      actualEndDate: new Date('2024-02-02'),
    } as any
  });

  // 5.5 PRICING & QUOTATION PHASE
  console.log('📄 Seeding Pricing & Quotations...');
  const priceList = await prismaInstance.priceList.upsert({
    where: { tenantId_code: { tenantId, code: 'PL-RETAIL-01' } },
    update: {},
    create: { tenantId, code: 'PL-RETAIL-01', name: 'Retail Minimum Price' }
  });

  const existingPLI = await prismaInstance.priceListItem.findFirst({
    where: { tenantId, priceListId: priceList.id, itemCode: itemMap['FG-COF-001'] }
  });
  if (!existingPLI) {
    await prismaInstance.priceListItem.create({
      data: {
        tenantId, priceListId: priceList.id, itemCode: itemMap['FG-COF-001'],
        uomCode: 'PCS', unitPrice: 26000, effectiveDate: new Date('2024-01-01')
      }
    });
  }

  await prismaInstance.discountRule.upsert({
    where: { tenantId_code: { tenantId, code: 'DR-OPENING' } },
    update: {},
    create: {
      tenantId, code: 'DR-OPENING', name: 'Grand Opening - 5%',
      discountPercent: 5.0, effectiveDate: new Date('2024-01-01'),
      customerId: customer.id
    }
  });

  const sqCode = 'QT-2024-001';
  const quotation = await prismaInstance.salesQuotation.upsert({
    where: { tenantId_code: { tenantId, code: sqCode } },
    update: {},
    create: {
      tenantId, code: sqCode, customerId: customer.id,
      issueDate: new Date('2024-02-11'),
      status: 'APPROVED',
      items: {
        create: [
          { tenantId, lineNo: 1, description: 'Signature Latte 250ml', qty: 500, uomCode: 'PCS', unitPrice: 26000, discount: 1000 }
        ]
      }
    }
  });

  // 6. SALES PHASE (Story: Selling to Customer)
  console.log('💰 Seeding Sales Transactional Flow...');
  const soCode = 'SO-2024-ENT-001';
  const salesOrder = await prismaInstance.salesOrder.upsert({
    where: { tenantId_code: { tenantId, code: soCode } },
    update: {},
    create: {
      tenantId, code: soCode,
      customerId: customer.id,
      quotationId: quotation.id,
      orderDate: new Date('2024-02-15'),
      status: 'APPROVED',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['FG-COF-001'], description: 'Latte Signature Batch 1', qty: 500, unitPrice: 25000, taxCodeId: ppn11?.id }
        ]
      }
    }
  });

  // 7. FINANCE & TAX (Story: Records of Money)
  console.log('💳 Seeding Accounting Entries...');
  const arAccount = await prismaInstance.coaAccount.findFirst({ where: { tenantId, code: { startsWith: '1-12' } } }); // AR Account
  const revAccount = await prismaInstance.coaAccount.findFirst({ where: { tenantId, code: { startsWith: '4-' } } }); // Revenue Account

  if (arAccount && revAccount) {
    const invoiceCode = 'INV-2024-ENT-001';
    const invoice = await prismaInstance.salesInvoice.upsert({
      where: { tenantId_code: { tenantId, code: invoiceCode } },
      update: {},
      create: {
        tenantId, code: invoiceCode, customerId: customer.id, orderId: salesOrder.id,
        invoiceDate: new Date('2024-02-20'), status: 'APPROVED',
        items: {
          create: [
            { tenantId, lineNo: 1, itemId: itemMap['FG-COF-001'], description: 'Latte Signature 250ml', qty: 500, unitPrice: 25000, taxCodeId: ppn11?.id }
          ]
        }
      } as any
    });

    const commScheme = await prismaInstance.commissionScheme.upsert({
      where: { tenantId_code: { tenantId, code: 'COMM-SNR-01' } },
      update: {},
      create: { tenantId, code: 'COMM-SNR-01', name: 'Senior Sales Deal', rate: 2.5 }
    });

    const existingComm = await prismaInstance.commissionEntry.findFirst({
      where: { tenantId, invoiceId: invoice.id, salesUserId: admin?.id }
    });
    if (!existingComm) {
      await prismaInstance.commissionEntry.create({
        data: {
          tenantId, schemeId: commScheme.id, invoiceId: invoice.id, salesUserId: admin?.id,
          baseAmount: 12500000, amount: 312500
        } as any
      });
    }

    await prismaInstance.journalEntry.upsert({
      where: { tenantId_entryNo: { tenantId, entryNo: 'JE-SO-2024-001' } },
      update: {},
      create: {
        tenantId, entryNo: 'JE-SO-2024-001',
        entryDate: new Date('2024-02-20'),
        description: `Revenue for SO ${soCode}`,
        status: 'POSTED',
        totalDebit: 12500000,
        totalCredit: 12500000,
        referenceNo: soCode,
        lines: {
          create: [
            { tenantId, lineNo: 1, accountCode: arAccount.code, debit: 12500000, credit: 0, description: 'Customer AR' },
            { tenantId, lineNo: 2, accountCode: revAccount.code, debit: 0, credit: 12500000, description: 'Product Sales Revenue' }
          ]
        }
      }
    });
  }

  // 8. LOGISTICS PHASE (Story: Shipping the goods)
  console.log('🚛 Seeding Logistics & Deliveries...');
  const fleet = await prismaInstance.fleetVehicle.findFirst({ where: { tenantId } });

  const carrier = await prismaInstance.carrier.upsert({
    where: { tenantId_code: { tenantId, code: 'JNE-ENT' } },
    update: {},
    create: { tenantId, code: 'JNE-ENT', name: 'JNE Enterprise Corporate' }
  });

  if (fleet) {
    const deliveryOrder = await prismaInstance.deliveryOrder.upsert({
      where: { tenantId_code: { tenantId, code: 'DO-2024-001' } },
      update: {},
      create: {
        tenantId, code: 'DO-2024-001',
        salesOrderId: salesOrder.id,
        customerId: customer.id,
        actualDeliveredAt: new Date('2024-02-22'),
        status: 'DELIVERED',
        warehouseId: warehouse.id,
        items: {
          create: [
            { tenantId, lineNo: 1, itemId: itemMap['FG-COF-001'], description: 'Signature Latte 250ml', orderedQty: 500, uomCode: 'PCS' }
          ]
        }
      } as any
    });

    if (carrier) {
      const existingShipment = await prismaInstance.shipment.findFirst({ where: { tenantId, orderId: salesOrder.id } });
      if (!existingShipment) {
        await prismaInstance.shipment.create({
          data: {
            tenantId, code: 'SHP-2024-001', orderId: salesOrder.id, carrierId: carrier.id,
            trackingNo: 'JNE-TRK-998877', shipDate: new Date('2024-02-22'), status: 'SHIPPED',
            deliveryOrders: { connect: { id: deliveryOrder.id } }
          }
        });
      }
    }
  }

  // 8.7 SALES RETURN PHASE (Story: Damaged goods return)
  console.log('↩️ Seeding Sales Returns...');
  const existingReturn = await prismaInstance.salesReturn.findFirst({ where: { tenantId, orderId: salesOrder.id } });
  if (!existingReturn) {
    const srCode = 'SR-2024-001';
    await prismaInstance.salesReturn.create({
      data: {
        tenantId, code: srCode, customerId: customer.id, orderId: salesOrder.id,
        returnDate: new Date('2024-02-25'), status: 'APPROVED',
        notes: '5 bottles returned due to damaged seals during courier transit.',
        items: {
          create: [
            { tenantId, lineNo: 1, itemId: itemMap['FG-COF-001'], description: 'Signature Latte 250ml - Damaged Seal', qty: 5, unitPrice: 25000, taxCodeId: ppn11?.id }
          ]
        }
      } as any
    });
  }

  // 8.8 SUBSCRIPTION PHASE (Story: Recurring maintenance)
  console.log('🔄 Seeding Sales Subscriptions...');
  const existingSub = await prismaInstance.salesSubscription.findFirst({ where: { tenantId, customerId: customer.id } });
  if (!existingSub) {
    await prismaInstance.salesSubscription.create({
      data: {
        tenantId, customerId: customer.id, planName: 'Platinum Coffee Machine Maintenance',
        billingCycle: 'MONTHLY', status: 'ACTIVE', startDate: new Date('2024-03-01'),
        nextBillingDate: new Date('2024-04-01'), amount: 5000000,
        notes: 'Monthly PM service for espresso machines across 5 priority locations.'
      }
    });
  }

  // 9. QMS PHASE (Story: Handling Quality Issues)
  console.log('✅ Seeding QMS & Compliance Flow...');
  const reporter = await prismaInstance.user.findFirst({ where: { tenantId } });
  
  const ncr = await prismaInstance.nonConformanceReport.upsert({
    where: { tenantId_code: { tenantId, code: 'NCR-2024-001' } },
    update: {},
    create: {
      tenantId, code: 'NCR-2024-001',
      sourceType: 'MANUFACTURING',
      ncrType: 'RAW_MATERIAL_QUALITY',
      qty: 2.5,
      itemId: itemMap['RM-CB-001'],
      severity: 'MEDIUM',
      status: 'OPEN',
      description: 'Ditemukan kelembapan berlebih pada biji kopi saat proses penimbangan untuk WO-2024-001.',
      reportedById: reporter?.id || '',
    } as any
  });

  await prismaInstance.capa.upsert({
    where: { tenantId_code: { tenantId, code: 'CAPA-2024-001' } },
    update: {},
    create: {
      tenantId, code: 'CAPA-2024-001',
      description: 'Investigasi menunjukkan area gudang bahan baku terlalu lembap.',
      rootCause: 'AC Gudang mati selama 24 jam.',
      correctiveAction: 'Perbaikan AC dan penambahan dehumidifier.',
      preventiveAction: 'Jadwal maintenance rutin AC gudang setiap bulan.',
      status: 'IMPLEMENTING',
      sourceNcrId: ncr.id,
    } as any
  });

  // 13. ADVANCED INVENTORY MANAGEMENT
  console.log('📦 Seeding Advanced Inventory Mechanics...');
  const prodWarehouse = await prismaInstance.warehouse.upsert({
    where: { tenantId_code: { tenantId, code: 'WH-PROD-01' } },
    update: {},
    create: {
      tenantId, code: 'WH-PROD-01', name: 'Production Floor'
    }
  });

  const trfCode = 'TRF-2024-ENT-001';
  await prismaInstance.stockTransfer.upsert({
    where: { tenantId_code: { tenantId, code: trfCode } },
    update: {},
    create: {
      tenantId, code: trfCode,
      fromWarehouseId: warehouse.id,
      toWarehouseId: prodWarehouse.id,
      transferDate: new Date('2024-02-05'),
      status: 'POSTED',
      notes: 'Transfer RM-CB-001 to production floor for weekly quota.',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans Bulk', qty: 50, uomCode: 'KG' }
        ]
      }
    } as any
  });

  const stcCode = 'STC-2024-ENT-001';
  await prismaInstance.stockCount.upsert({
    where: { tenantId_code: { tenantId, code: stcCode } },
    update: {},
    create: {
      tenantId, code: stcCode,
      warehouseId: warehouse.id,
      countDate: new Date('2024-02-15'),
      status: 'POSTED',
      notes: 'End of month cycle count for raw materials.',
      items: {
        create: [
          { 
            tenantId, lineNo: 1, itemId: itemMap['RM-AR-001'], description: 'Premium Aren Pulverized',
            systemQty: 500, countedQty: 495, varianceQty: -5, uomCode: 'KG'
          }
        ]
      }
    } as any
  });

  // 14. PUTAWAY
  console.log('📦 Seeding Putaway (Bin Placement)...');
  await prismaInstance.putaway.upsert({
    where: { tenantId_code: { tenantId, code: 'PTW-2024-ENT-001' } },
    update: {},
    create: {
      tenantId, code: 'PTW-2024-ENT-001',
      grnId: grn.id,
      warehouseId: warehouse.id,
      putawayDate: new Date('2024-01-16'),
      status: 'POSTED',
      notes: 'Putaway RM from GRN-2024-ENT-001 to storage racks after receiving.',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], description: 'Kintamani Beans → Rak A-01', qty: 100 },
          { tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'], description: 'Gula Aren → Rak B-03', qty: 50 }
        ]
      }
    } as any
  });

  // 15. PICKING
  console.log('🧺 Seeding Picking (Order Fulfillment)...');
  const pickingSalesOrder = await prismaInstance.salesOrder.findFirst({ where: { tenantId } });
  if (pickingSalesOrder) {
    await prismaInstance.picking.upsert({
      where: { tenantId_code: { tenantId, code: 'PCK-2024-ENT-001' } },
      update: {},
      create: {
        tenantId, code: 'PCK-2024-ENT-001',
        salesOrderId: pickingSalesOrder.id,
        warehouseId: warehouse.id,
        pickingDate: new Date('2024-03-05'),
        status: 'POSTED',
        notes: 'Picking list for Alfamart Group sales order fulfillment.',
        items: {
          create: [
            { tenantId, lineNo: 1, itemId: itemMap['FG-COF-001'], description: 'Signature Aren Latte 250ml', qty: 100, pickedQty: 100 }
          ]
        }
      } as any
    });

    // 16. PACKING
    console.log('📦 Seeding Packing (Box & Carton)...');
    await prismaInstance.packing.upsert({
      where: { tenantId_code: { tenantId, code: 'PKG-2024-ENT-001' } },
      update: {},
      create: {
        tenantId, code: 'PKG-2024-ENT-001',
        salesOrderId: pickingSalesOrder.id,
        warehouseId: warehouse.id,
        packingDate: new Date('2024-03-06'),
        status: 'POSTED',
        notes: 'Packing into carton boxes before dispatch to customer.',
        items: {
          create: [
            {
              tenantId, lineNo: 1, itemId: itemMap['FG-COF-001'],
              description: 'Signature Aren Latte – Carton Box A',
              qty: 50, uomCode: 'PCS', boxNo: 'BOX-001',
              weight: 12.5, length: 40, width: 30, height: 25, trackingId: 'JNE-TRK-001'
            },
            {
              tenantId, lineNo: 2, itemId: itemMap['FG-COF-001'],
              description: 'Signature Aren Latte – Carton Box B',
              qty: 50, uomCode: 'PCS', boxNo: 'BOX-002',
              weight: 12.5, length: 40, width: 30, height: 25, trackingId: 'JNE-TRK-002'
            }
          ]
        }
      } as any
    });
  }

  // 17. QC INSPECTION
  console.log('🔬 Seeding QC Inspection...');
  await prismaInstance.qcInspection.upsert({
    where: { tenantId_code: { tenantId, code: 'QCI-2024-ENT-001' } },
    update: {},
    create: {
      tenantId, code: 'QCI-2024-ENT-001',
      grnId: grn.id,
      inspectionDate: new Date('2024-01-16'),
      inspectorName: 'Budi Santoso (Head of QC)',
      status: 'POSTED',
      notes: 'Incoming goods inspection upon receipt. Beans inspected for moisture and aroma quality.',
      items: {
        create: [
          {
            tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'],
            description: 'Kintamani Beans – Moisture & Aroma Check',
            sampleQty: 20, passedQty: 17, failedQty: 3,
            defectReason: '3 KG rejected: humidity above 13%. Logged to NCR.'
          },
          {
            tenantId, lineNo: 2, itemId: itemMap['RM-AR-001'],
            description: 'Organic Gula Aren – Purity Test',
            sampleQty: 10, passedQty: 10, failedQty: 0
          }
        ]
      }
    } as any
  });

  // 18. ITEM BATCH & SERIAL
  console.log('🔖 Seeding Item Batch & Serial Numbers...');
  const batch = await prismaInstance.itemBatch.upsert({
    where: { tenantId_itemId_code: { tenantId, itemId: itemMap['RM-CB-001'], code: 'BATCH-CB-2024-01' } },
    update: {},
    create: {
      tenantId,
      itemId: itemMap['RM-CB-001'],
      code: 'BATCH-CB-2024-01',
      expiryDate: new Date('2025-01-01')
    }
  });

  // FG-COF-001 tracked by serial (bottles get individual QR)
  const serialNos = ['SN-FG-001', 'SN-FG-002', 'SN-FG-003'];
  for (const sn of serialNos) {
    await prismaInstance.itemSerial.upsert({
      where: { tenantId_serialNo: { tenantId, serialNo: sn } },
      update: {},
      create: {
        tenantId,
        itemId: itemMap['FG-COF-001'],
        serialNo: sn,
        status: 'AVAILABLE'
      }
    });
  }

  // 19. MRP PLANNING (Inventory Planning)
  console.log('📊 Seeding MRP Planning Run...');
  const mrpRun = await prismaInstance.mrpRun.create({
    data: {
      tenantId,
      runDate: new Date('2024-03-01'),
      status: 'COMPLETED',
      demandSource: 'SALES_ORDER',
      planType: 'STANDARD',
      planningHorizonDays: 90,
      periodStart: new Date('2024-03-01'),
      periodEnd: new Date('2024-05-31'),
      includeSalesOrder: true,
      includeForecast: true,
      includeMinStock: true,
      notes: 'Q2 2024 MRP Run - planning raw material replenishment',
      suggestions: {
        create: [
          {
            tenantId,
            itemId: itemMap['RM-CB-001'],
            suggestionType: 'PURCHASE',
            qtyRequired: 200,
            qtyOnHand: 450,
            qtyOnOrder: 0,
            qtySuggested: 200,
            dueDate: new Date('2024-03-15'),
            status: 'OPEN',
            uomCode: 'KG',
            unitCost: 120000,
            totalCost: 24000000,
            priority: 80,
            leadTimeDays: 7,
            notes: 'Replenish beans for April production quota based on SO demand.'
          },
          {
            tenantId,
            itemId: itemMap['RM-AR-001'],
            suggestionType: 'PURCHASE',
            qtyRequired: 100,
            qtyOnHand: 495,
            qtyOnOrder: 0,
            qtySuggested: 100,
            dueDate: new Date('2024-03-20'),
            status: 'APPROVED',
            uomCode: 'KG',
            unitCost: 85000,
            totalCost: 8500000,
            priority: 60,
            leadTimeDays: 5,
            notes: 'Reorder Gula Aren considering 5KG variance loss from opname.'
          }
        ]
      }
    } as any
  });

  // 20. AI FORECASTING
  console.log('🤖 Seeding AI Inventory Forecasting...');
  const forecastItems = [
    {
      itemId: itemMap['FG-COF-001'],
      forecastDate: new Date('2024-04-01'),
      targetPeriod: '2024-Q2',
      confidenceScore: 87.5,
      predictedDemand: 4800,
      recommendedQty: 5200,
      trend: 'RISING',
      insights: 'Sales trend indicates 18% MoM growth. Ramadan season likely to boost demand. Recommend preemptive stock buildup of 5,200 units by end of March.'
    },
    {
      itemId: itemMap['RM-CB-001'],
      forecastDate: new Date('2024-04-01'),
      targetPeriod: '2024-Q2',
      confidenceScore: 82.3,
      predictedDemand: 520,
      recommendedQty: 580,
      trend: 'RISING',
      insights: 'Coffee bean consumption follows finished goods demand. 10% safety buffer recommended due to import lead time variance.'
    },
    {
      itemId: itemMap['RM-AR-001'],
      forecastDate: new Date('2024-04-01'),
      targetPeriod: '2024-Q2',
      confidenceScore: 79.1,
      predictedDemand: 260,
      recommendedQty: 300,
      trend: 'STABLE',
      insights: 'Aren supply chain is stable. Minor reorder recommended to cover opname variance and safety stock threshold.'
    }
  ];

  for (const fc of forecastItems) {
    await prismaInstance.inventoryForecast.create({ data: { tenantId, ...fc } });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 21. MANUFACTURING EXECUTION
  // ─────────────────────────────────────────────────────────────────────────
  console.log('🏭 Seeding Manufacturing Execution...');
  const execWO = await prismaInstance.workOrder.findFirst({ where: { tenantId, code: 'WO-2024-001' } });

  if (execWO) {
    const opExisting = await prismaInstance.workOrderOperation.findFirst({ where: { tenantId, workOrderId: execWO.id } });
    if (!opExisting) {
      await prismaInstance.workOrderOperation.createMany({
        data: [
          { tenantId, workOrderId: execWO.id, lineNo: 1, operationNo: 10, description: 'Grinding & Espresso Extraction', workstation: 'Mesin Grinder #1', status: 'COMPLETED', laborHours: 2, machineHours: 2, setupTime: 0.5, cycleTime: 0.12, actualLaborHours: 2.2, actualMachineHours: 2.1, qtyCompleted: 1000, rejectedQty: 5, scrapQty: 2, operatorName: 'Agus Wirawan', startDate: new Date('2024-02-01T07:00:00Z'), endDate: new Date('2024-02-01T09:00:00Z'), claimedAt: new Date('2024-02-01T07:00:00Z'), completedAt: new Date('2024-02-01T09:00:00Z'), notes: 'All 1000 units extracted. 5 units rejected for under-extraction.' },
          { tenantId, workOrderId: execWO.id, lineNo: 2, operationNo: 20, description: 'Blending with Aren Milk Base', workstation: 'Blending Station #2', status: 'COMPLETED', laborHours: 1.5, machineHours: 1.5, setupTime: 0.25, actualLaborHours: 1.5, actualMachineHours: 1.6, qtyCompleted: 995, operatorName: 'Dewi Rahmawati', startDate: new Date('2024-02-01T09:30:00Z'), endDate: new Date('2024-02-01T11:00:00Z'), completedAt: new Date('2024-02-01T11:00:00Z') },
          { tenantId, workOrderId: execWO.id, lineNo: 3, operationNo: 30, description: 'Bottling & Sealing', workstation: 'Bottling Line #1', status: 'COMPLETED', laborHours: 2, machineHours: 3, actualLaborHours: 2, actualMachineHours: 3, qtyCompleted: 995, operatorName: 'Fauzi Hidayat', startDate: new Date('2024-02-01T11:30:00Z'), endDate: new Date('2024-02-02T08:00:00Z'), completedAt: new Date('2024-02-02T08:00:00Z') }
        ]
      });
    }

    await prismaInstance.productionIssue.upsert({
      where: { tenantId_code: { tenantId, code: 'PI-2024-001' } },
      update: {},
      create: {
        tenantId, code: 'PI-2024-001', workOrderId: execWO.id,
        issueDate: new Date('2024-02-01'), status: 'POSTED',
        warehouseId: warehouse.id, issuedBy: 'Warehouse Keeper', shiftNo: 1,
        purpose: 'Production consumption for WO-2024-001',
        items: { create: [
          { tenantId, lineNo: 1, itemId: itemMap['RM-CB-001'], qty: 100, uomCode: 'KG', qtyRequired: 100, costPrice: 120000 },
          { tenantId, lineNo: 2, itemId: itemMap['RM-MK-001'], qty: 50, uomCode: 'LTR', qtyRequired: 50, costPrice: 23000 },
          { tenantId, lineNo: 3, itemId: itemMap['RM-AR-001'], qty: 50, uomCode: 'KG', qtyRequired: 50, costPrice: 85000 }
        ]}
      } as any
    });

    await prismaInstance.productionReceipt.upsert({
      where: { tenantId_code: { tenantId, code: 'PR-2024-001' } },
      update: {},
      create: {
        tenantId, code: 'PR-2024-001', workOrderId: execWO.id,
        receiptDate: new Date('2024-02-02'), qtyProduced: 995, qtyRejected: 5, qtyScrap: 2,
        uomCode: 'BTL', status: 'POSTED', receivedBy: 'QC Manager',
        warehouseId: warehouse.id, shiftNo: 1, batchNo: 'BATCH-FG-2024-02',
        notes: '995 units received. 5 rejected. 2 scrap (bottle defect).'
      } as any
    });

    const ipQcExists = await prismaInstance.inProcessQc.findFirst({ where: { tenantId, workOrderId: execWO.id } });
    if (!ipQcExists) {
      await prismaInstance.inProcessQc.create({
        data: { tenantId, workOrderId: execWO.id, status: 'PASSED', qtyInspected: 100, qtyPassed: 98, qtyFailed: 2, notes: 'Mid-production QC during bottling. 2 units failed cap seal test.' } as any
      });
    }
  }

  const wo2 = await prismaInstance.workOrder.upsert({
    where: { tenantId_code: { tenantId, code: 'WO-2024-002' } },
    update: {},
    create: {
      tenantId, code: 'WO-2024-002', finishedGoodItemId: itemMap['FG-COF-001'],
      qtyPlanned: 500, qtyProduced: 200, status: 'IN_PROGRESS',
      warehouseId: warehouse.id, workCenter: 'Blending Line', priority: 80,
      plannedStartDate: new Date('2024-03-10'), plannedEndDate: new Date('2024-03-12'),
      actualStartDate: new Date('2024-03-10'),
      notes: 'Q1 March batch – 500 units planned, 200 produced so far.'
    } as any
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 22. SHOP FLOOR
  // ─────────────────────────────────────────────────────────────────────────
  console.log('🔧 Seeding Shop Floor Logs & Timers...');
  if (execWO) {
    const sfLogExists = await prismaInstance.shopFloorLog.findFirst({ where: { tenantId, workOrderId: execWO.id } });
    if (!sfLogExists) {
      await prismaInstance.shopFloorLog.createMany({
        data: [
          { tenantId, workOrderId: execWO.id, operatorName: 'Agus Wirawan', action: 'START', prevStatus: 'RELEASED', newStatus: 'IN_PROGRESS', qtyReported: 0, laborHours: 0, loggedAt: new Date('2024-02-01T07:00:00Z'), notes: 'Operator started grinding operation.' },
          { tenantId, workOrderId: execWO.id, operatorName: 'Agus Wirawan', action: 'REPORT_PROGRESS', prevStatus: 'IN_PROGRESS', newStatus: 'IN_PROGRESS', qtyReported: 500, laborHours: 1, loggedAt: new Date('2024-02-01T08:00:00Z'), notes: 'Mid-shift: 500 units extracted.' },
          { tenantId, workOrderId: execWO.id, operatorName: 'Dewi Rahmawati', action: 'COMPLETE_OPERATION', prevStatus: 'IN_PROGRESS', newStatus: 'IN_PROGRESS', qtyReported: 995, laborHours: 2.2, loggedAt: new Date('2024-02-01T09:00:00Z'), notes: 'Grinding done. 995 units passed to blending.' },
          { tenantId, workOrderId: execWO.id, operatorName: 'Fauzi Hidayat', action: 'COMPLETE', prevStatus: 'IN_PROGRESS', newStatus: 'COMPLETED', qtyReported: 995, laborHours: 5.5, loggedAt: new Date('2024-02-02T08:00:00Z'), notes: 'WO-2024-001 fully completed. 995 bottles produced.' }
        ]
      });

      await prismaInstance.shopFloorTimer.createMany({
        data: [
          { tenantId, workOrderId: execWO.id, operatorName: 'Agus Wirawan', startTime: new Date('2024-02-01T07:00:00Z'), endTime: new Date('2024-02-01T09:15:00Z'), durationMin: 135, breakMin: 0, status: 'STOPPED' },
          { tenantId, workOrderId: execWO.id, operatorName: 'Dewi Rahmawati', startTime: new Date('2024-02-01T09:30:00Z'), endTime: new Date('2024-02-01T11:00:00Z'), durationMin: 90, breakMin: 15, status: 'STOPPED' }
        ]
      });
    }
  }

  const sfLog2Exists = await prismaInstance.shopFloorLog.findFirst({ where: { tenantId, workOrderId: wo2.id } });
  if (!sfLog2Exists) {
    await prismaInstance.shopFloorLog.create({
      data: { tenantId, workOrderId: wo2.id, operatorName: 'Budi Prakoso', action: 'START', prevStatus: 'RELEASED', newStatus: 'IN_PROGRESS', qtyReported: 0, laborHours: 0, loggedAt: new Date('2024-03-10T07:00:00Z'), notes: 'Started WO-2024-002.' }
    });
    await prismaInstance.shopFloorTimer.create({
      data: { tenantId, workOrderId: wo2.id, operatorName: 'Budi Prakoso', startTime: new Date('2024-03-10T07:00:00Z'), status: 'RUNNING', breakMin: 30 }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 23. MANUFACTURING COSTING
  // ─────────────────────────────────────────────────────────────────────────
  console.log('💰 Seeding Manufacturing Costing...');
  if (execWO) {
    const costExists = await prismaInstance.productionCost.findFirst({ where: { tenantId, workOrderId: execWO.id } });
    if (!costExists) {
      const productionCost = await prismaInstance.productionCost.create({
        data: {
          tenantId, workOrderId: execWO.id, period: '2024-02',
          materialCost: 17400000, laborCost: 2750000, overheadCost: 1500000,
          totalCost: 21650000, standardCost: 19900000, actualCost: 21650000,
          materialVariance: 500000, laborVariance: 250000, overheadVariance: 0,
          isFinalized: true
        }
      });
      await prismaInstance.productionCostDetail.createMany({
        data: [
          { tenantId, productionCostId: productionCost.id, costCategory: 'MATERIAL', name: 'Kintamani Beans (100 KG)', standardAmount: 11500000, actualAmount: 12000000, variance: 500000 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'MATERIAL', name: 'Full Cream Milk (50 LTR)', standardAmount: 1150000, actualAmount: 1150000, variance: 0 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'MATERIAL', name: 'Organic Gula Aren (50 KG)', standardAmount: 4250000, actualAmount: 4250000, variance: 0 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'LABOR', name: 'Operator - Grinding', standardAmount: 1200000, actualAmount: 1320000, variance: 120000 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'LABOR', name: 'Operator - Blending', standardAmount: 900000, actualAmount: 900000, variance: 0 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'LABOR', name: 'Operator - Bottling', standardAmount: 400000, actualAmount: 530000, variance: 130000 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'OVERHEAD', name: 'Machine Depreciation', standardAmount: 800000, actualAmount: 800000, variance: 0 },
          { tenantId, productionCostId: productionCost.id, costCategory: 'OVERHEAD', name: 'Electricity & Utilities', standardAmount: 700000, actualAmount: 700000, variance: 0 }
        ]
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 24. FSM SPARE PARTS
  // ─────────────────────────────────────────────────────────────────────────
  console.log('🔧 Seeding FSM Spare Parts...');

  // -- Spare Part Items (registered in item master)
  const sparePartsData = [
    { code: 'SP-GRINDER-BLADE', name: 'Grinder Blade Set – Burr 58mm', uom: 'SET' },
    { code: 'SP-PUMP-VIBR',     name: 'Vibration Pump 15 Bar',         uom: 'PCS' },
    { code: 'SP-BOILER-SEAL',   name: 'Boiler Gasket & Seal Kit',      uom: 'SET' },
    { code: 'SP-GROUP-GASKET',  name: 'Group Head Gasket 8.5mm',       uom: 'PCS' },
    { code: 'SP-STEAM-VALVE',   name: 'Steam Valve Assembly',          uom: 'PCS' },
  ];

  const spMap: Record<string, string> = {};
  for (const sp of sparePartsData) {
    const spItem = await prismaInstance.item.upsert({
      where: { tenantId_code: { tenantId, code: sp.code } },
      update: {},
      create: {
        tenantId, code: sp.code, name: sp.name,
        baseUomCode: sp.uom, isActive: true,
        isPurchaseItem: true, isSalesItem: false,
      }
    });
    spMap[sp.code] = spItem.id;
  }

  // -- Customer Equipment (coffee machines deployed at Alfamart sites)
  const equipData = [
    {
      code: 'EQ-CM-ALF-001', name: 'La Marzocco Linea PB – Alfamart Fatmawati',
      type: 'COFFEE_MACHINE', status: 'OPERATIONAL',
      location: 'Alfamart Fatmawati, Jakarta Selatan',
      manufacturer: 'La Marzocco', model: 'Linea PB 2-Group',
      serialNumber: 'LM-PB-2024-001', criticality: 'HIGH',
      installedDate: new Date('2024-01-20'),
      warrantyExpiryDate: new Date('2026-01-20'),
    },
    {
      code: 'EQ-CM-ALF-002', name: 'La Marzocco Linea PB – Alfamart Kemang',
      type: 'COFFEE_MACHINE', status: 'MAINTENANCE',
      location: 'Alfamart Kemang, Jakarta Selatan',
      manufacturer: 'La Marzocco', model: 'Linea PB 2-Group',
      serialNumber: 'LM-PB-2024-002', criticality: 'HIGH',
      installedDate: new Date('2024-01-22'),
      warrantyExpiryDate: new Date('2026-01-22'),
    },
    {
      code: 'EQ-GRINDER-ALF-001', name: 'Mahlkonig E65S GbW – Alfamart Fatmawati',
      type: 'GRINDER', status: 'OPERATIONAL',
      location: 'Alfamart Fatmawati, Jakarta Selatan',
      manufacturer: 'Mahlkonig', model: 'E65S GbW',
      serialNumber: 'MK-E65-2024-001', criticality: 'MEDIUM',
      installedDate: new Date('2024-01-20'),
    },
  ];

  const eqMap: Record<string, string> = {};
  for (const eq of equipData) {
    const equipment = await prismaInstance.equipment.upsert({
      where: { tenantId_code: { tenantId, code: eq.code } },
      update: {},
      create: { tenantId, ...eq }
    });
    eqMap[eq.code] = equipment.id;
  }

  // -- FsmSparePartCompatibility (which spare part fits which machine)
  const compatibilities = [
    { itemCode: 'SP-GRINDER-BLADE', equipCode: 'EQ-GRINDER-ALF-001', notes: 'Replace every 300 KG of beans processed.' },
    { itemCode: 'SP-PUMP-VIBR',     equipCode: 'EQ-CM-ALF-001',      notes: 'Compatible with Linea PB 2-Group. Replace if pressure < 9 Bar.' },
    { itemCode: 'SP-PUMP-VIBR',     equipCode: 'EQ-CM-ALF-002',      notes: 'Compatible with Linea PB 2-Group. Replace if pressure < 9 Bar.' },
    { itemCode: 'SP-BOILER-SEAL',   equipCode: 'EQ-CM-ALF-001',      notes: 'Annual preventive replacement recommended.' },
    { itemCode: 'SP-BOILER-SEAL',   equipCode: 'EQ-CM-ALF-002',      notes: 'Annual preventive replacement recommended.' },
    { itemCode: 'SP-GROUP-GASKET',  equipCode: 'EQ-CM-ALF-001',      notes: 'Replace every 6 months or 10,000 cycles.' },
    { itemCode: 'SP-GROUP-GASKET',  equipCode: 'EQ-CM-ALF-002',      notes: 'Replace every 6 months or 10,000 cycles.' },
    { itemCode: 'SP-STEAM-VALVE',   equipCode: 'EQ-CM-ALF-002',      notes: 'Replace due to leaking steam wand on this unit.' },
  ];

  for (const c of compatibilities) {
    const existing = await prismaInstance.fsmSparePartCompatibility.findFirst({
      where: { tenantId, itemId: spMap[c.itemCode], equipmentId: eqMap[c.equipCode] }
    });
    if (!existing) {
      await prismaInstance.fsmSparePartCompatibility.create({
        data: { tenantId, itemId: spMap[c.itemCode], equipmentId: eqMap[c.equipCode], notes: c.notes }
      });
    }
  }

  // -- FSM Service Order using spare parts (breakdown at Alfamart Kemang)
  const fsmSO = await prismaInstance.fsmServiceOrder.upsert({
    where: { tenantId_code: { tenantId, code: 'FSM-SO-2024-ENT-001' } },
    update: {},
    create: {
      tenantId, code: 'FSM-SO-2024-ENT-001',
      customerId: customer.id,
      serviceType: 'REPAIR',
      priority: 'HIGH',
      status: 'COMPLETED',
      subject: 'Espresso Machine Breakdown – Pump & Steam Valve Failure',
      description: 'Unit EQ-CM-ALF-002 at Alfamart Kemang reported pressure issue and steam wand leak. Vibration pump replaced and steam valve assembly serviced.',
      locationAddress: 'Jl. Kemang Raya No. 12, Jakarta Selatan 12730',
      totalEstimatedDuration: 180,
      slaDate: new Date('2024-03-20'),
      preferredDate: new Date('2024-03-18'),
      notes: 'Customer reported machine down at 07:30 AM. Technician dispatched by 09:00 AM.',
      items: {
        create: [
          { tenantId, lineNo: 1, itemId: spMap['SP-PUMP-VIBR'],    description: 'Vibration Pump 15 Bar – Replacement',   qty: 1, uomCode: 'PCS' },
          { tenantId, lineNo: 2, itemId: spMap['SP-STEAM-VALVE'],  description: 'Steam Valve Assembly – Full Replacement', qty: 1, uomCode: 'PCS' },
          { tenantId, lineNo: 3, itemId: spMap['SP-GROUP-GASKET'], description: 'Group Head Gasket – Preventive Change',   qty: 2, uomCode: 'PCS' },
        ]
      }
    } as any
  });

  // -- StockBalance for spare parts (FSM warehouse stock)
  const spareStockItems = [
    { code: 'SP-GRINDER-BLADE', qty: 10 },
    { code: 'SP-PUMP-VIBR',     qty: 6 },
    { code: 'SP-BOILER-SEAL',   qty: 8 },
    { code: 'SP-GROUP-GASKET',  qty: 20 },
    { code: 'SP-STEAM-VALVE',   qty: 4 },
  ];

  for (const ss of spareStockItems) {
    const existing = await prismaInstance.stockBalance.findFirst({
      where: { tenantId, warehouseId: warehouse.id, itemId: spMap[ss.code] }
    });
    if (!existing) {
      await prismaInstance.stockBalance.create({
        data: { tenantId, warehouseId: warehouse.id, itemId: spMap[ss.code], qtyOnHand: ss.qty, qtyAvailable: ss.qty }
      });
    }
  }

  console.log('✅ --- COMPREHENSIVE ENTERPRISE DATA SEEDING COMPLETED ---');
}
