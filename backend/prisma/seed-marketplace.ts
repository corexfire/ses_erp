import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function seedMarketplace(tenantId: string) {
  console.log('--- SEEDING E-COMMERCE MARKETPLACE DATA ---');

  // 1. Create Marketplace Channels
  const channelData = [
    {
      code: 'TOKOPEDIA',
      name: 'Tokopedia',
      type: 'TOKOPEDIA',
      apiEndpoint: 'https://api.tokopedia.com/v2',
      clientId: 'tokped_client_' + tenantId.slice(0, 8),
      clientSecret: 'tokped_secret_' + tenantId.slice(0, 8),
      isActive: true,
    },
    {
      code: 'SHOPEE',
      name: 'Shopee',
      type: 'SHOPEE',
      apiEndpoint: 'https://partner.shopeemobile.com/api/v1',
      clientId: 'shopee_client_' + tenantId.slice(0, 8),
      clientSecret: 'shopee_secret_' + tenantId.slice(0, 8),
      isActive: true,
    },
    {
      code: 'LAZADA',
      name: 'Lazada',
      type: 'LAZADA',
      apiEndpoint: 'https://api.lazada.co.id/rest',
      clientId: 'lazada_client_' + tenantId.slice(0, 8),
      clientSecret: 'lazada_secret_' + tenantId.slice(0, 8),
      isActive: true,
    },
    {
      code: 'TIKTOK',
      name: 'TikTok Shop',
      type: 'TIKTOK',
      apiEndpoint: 'https://open.tiktokapis.com/v2',
      clientId: 'tiktok_client_' + tenantId.slice(0, 8),
      clientSecret: 'tiktok_secret_' + tenantId.slice(0, 8),
      isActive: true,
    },
    {
      code: 'BUKALAPAK',
      name: 'Bukalapak',
      type: 'BUKALAPAK',
      apiEndpoint: 'https://api.bukalapak.com/stripe',
      clientId: 'bukalapak_client_' + tenantId.slice(0, 8),
      clientSecret: 'bukalapak_secret_' + tenantId.slice(0, 8),
      isActive: false, // Non-active sample
    },
    {
      code: 'BLIBLI',
      name: 'Blibli',
      type: 'BLIBLI',
      apiEndpoint: 'https://api.blibli.com/v2/producer',
      clientId: 'blibli_client_' + tenantId.slice(0, 8),
      clientSecret: 'blibli_secret_' + tenantId.slice(0, 8),
      isActive: true,
    },
  ];

  const channels: any[] = [];
  for (const ch of channelData) {
    const existing = await prisma.marketplaceChannel.findFirst({
      where: { tenantId, code: ch.code }
    });
    if (!existing) {
      const created = await prisma.marketplaceChannel.create({
        data: { tenantId, ...ch }
      });
      channels.push(created);
      console.log(`Created channel: ${ch.name}`);
    } else {
      channels.push(existing);
      console.log(`Channel exists: ${ch.name}`);
    }
  }

  // 2. Get some items for listings
  const items = await prisma.item.findMany({
    where: { tenantId, isActive: true },
    take: 20
  });

  if (items.length === 0) {
    console.log('No items found. Creating sample product listings without itemId...');
  }

  // 3. Create Marketplace Listings
  const listingData = [
    // Tokopedia Listings
    { channelIdx: 0, name: 'Laptop ASUS ROG Strix G16', sku: 'LAP-ROG-001', price: 24500000, stock: 15, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 0 },
    { channelIdx: 0, name: 'Keyboard Mechanical Razer Huntsman V3', sku: 'KEY-RZR-003', price: 2850000, stock: 45, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 1 },
    { channelIdx: 0, name: 'Monitor LG UltraWide 34"', sku: 'MON-LG-034', price: 6750000, stock: 8, syncStock: true, syncPrice: false, status: 'PENDING', itemIdx: 2 },
    { channelIdx: 0, name: 'Mouse Gaming Logitech G502', sku: 'MSE-LGT-502', price: 1450000, stock: 120, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 3 },
    { channelIdx: 0, name: 'Headset SteelSeries Arctis 7', sku: 'HDP-SS-007', price: 3200000, stock: 25, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 4 },

    // Shopee Listings
    { channelIdx: 1, name: 'Laptop ASUS ROG Strix G16', sku: 'LAP-ROG-001', price: 23890000, stock: 12, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 0 },
    { channelIdx: 1, name: 'Keyboard Mechanical Razer Huntsman V3', sku: 'KEY-RZR-003', price: 2699000, stock: 50, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 1 },
    { channelIdx: 1, name: 'Mouse Wireless Logitech MX Master 3', sku: 'MSE-LGT-MX3', price: 1950000, stock: 35, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 5 },
    { channelIdx: 1, name: 'Webcam Logitech C920 HD Pro', sku: 'CAM-LGT-C920', price: 1250000, stock: 80, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 6 },
    { channelIdx: 1, name: 'Monitor Samsung 27" Curved', sku: 'MON-SAM-027', price: 3890000, stock: 20, syncStock: true, syncPrice: true, status: 'PENDING', itemIdx: 7 },

    // Lazada Listings
    { channelIdx: 2, name: 'Laptop ASUS ROG Strix G16', sku: 'LAP-ROG-001', price: 24200000, stock: 10, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 0 },
    { channelIdx: 2, name: 'Keyboard Mechanical Corsair K70', sku: 'KEY-COR-K70', price: 3150000, stock: 18, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 8 },
    { channelIdx: 2, name: 'Monitor LG UltraWide 34"', sku: 'MON-LG-034', price: 6590000, stock: 5, syncStock: true, syncPrice: false, status: 'FAILED', itemIdx: 2 },
    { channelIdx: 2, name: 'Mouse Gaming Logitech G502', sku: 'MSE-LGT-502', price: 1399000, stock: 95, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 3 },
    { channelIdx: 2, name: 'Headset SteelSeries Arctis 7+', sku: 'HDP-SS-007P', price: 3450000, stock: 15, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 9 },

    // TikTok Shop Listings
    { channelIdx: 3, name: 'Laptop ASUS ROG Strix G16', sku: 'LAP-ROG-001', price: 23990000, stock: 8, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 0 },
    { channelIdx: 3, name: 'Keyboard Mechanical Razer Huntsman V3 Pro', sku: 'KEY-RZR-003P', price: 2990000, stock: 30, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 1 },
    { channelIdx: 3, name: 'Mouse Wireless Logitech MX Master 3S', sku: 'MSE-LGT-MX3S', price: 2100000, stock: 25, syncStock: true, syncPrice: true, status: 'PENDING', itemIdx: 10 },
    { channelIdx: 3, name: 'Webcam Logitech Brio 4K', sku: 'CAM-LGT-BRIO', price: 4500000, stock: 12, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 11 },
    { channelIdx: 3, name: 'Monitor Samsung 27" Curved', sku: 'MON-SAM-027', price: 3750000, stock: 15, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 7 },

    // Blibli Listings
    { channelIdx: 5, name: 'Laptop ASUS ROG Strix G16', sku: 'LAP-ROG-001', price: 24400000, stock: 10, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 0 },
    { channelIdx: 5, name: 'Keyboard Mechanical Razer Huntsman V3', sku: 'KEY-RZR-003', price: 2790000, stock: 40, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 1 },
    { channelIdx: 5, name: 'Mouse Gaming Logitech G502 HERO', sku: 'MSE-LGT-502H', price: 1425000, stock: 75, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 12 },
    { channelIdx: 5, name: 'Monitor LG 32" 4K UHD', sku: 'MON-LG-032', price: 8950000, stock: 6, syncStock: true, syncPrice: true, status: 'PENDING', itemIdx: 13 },
    { channelIdx: 5, name: 'Headset HyperX Cloud II', sku: 'HDP-HX-C2', price: 1850000, stock: 55, syncStock: true, syncPrice: true, status: 'SYNCED', itemIdx: 14 },
  ];

  for (const listing of listingData) {
    const channel = channels[listing.channelIdx];
    if (!channel) continue;

    const existing = await prisma.marketplaceListing.findFirst({
      where: { tenantId, productSku: listing.sku, channelId: channel.id }
    });

    if (!existing) {
      const created = await prisma.marketplaceListing.create({
        data: {
          tenantId,
          channelId: channel.id,
          itemId: items[listing.itemIdx]?.id || null,
          productName: listing.name,
          productSku: listing.sku,
          marketplaceProductId: `MP-${channel.code}-${listing.sku}-${Date.now().toString().slice(-6)}`,
          marketplaceUrl: `https://www.${channel.code.toLowerCase()}.com/item/${listing.sku}`,
          sellingPrice: listing.price,
          stockQty: listing.stock,
          syncStock: listing.syncStock,
          syncPrice: listing.syncPrice,
          syncStatus: listing.status,
          lastSyncAt: listing.status === 'SYNCED' ? new Date(Date.now() - Math.random() * 86400000 * 3) : null,
          lastSyncError: listing.status === 'FAILED' ? 'Timeout saat menghubungkan ke API marketplace' : null,
          isActive: true,
          notes: `Listing produk ${listing.name} di ${channel.name}`,
        }
      });
      console.log(`Created listing: ${listing.name} @ ${channel.name}`);
    } else {
      console.log(`Listing exists: ${listing.name} @ ${channel.name}`);
    }
  }

  // 4. Create Sync Logs
  const allListings = await prisma.marketplaceListing.findMany({
    where: { tenantId },
    include: { channel: true }
  });

  const syncTypes = ['MANUAL', 'BULK', 'INVENTORY', 'PRICE', 'FULL'];
  const statuses = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'FAILED']; // 75% success rate

  for (const listing of allListings.slice(0, 30)) {
    const numLogs = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numLogs; i++) {
      const syncType = syncTypes[Math.floor(Math.random() * syncTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const daysAgo = Math.floor(Math.random() * 7);

      await prisma.marketplaceSyncLog.create({
        data: {
          tenantId,
          listingId: listing.id,
          channelId: listing.channelId,
          syncType,
          status,
          message: status === 'SUCCESS'
            ? `Sinkronisasi ${syncType.toLowerCase()} berhasil. ${listing.productName} telah diperbarui.`
            : `Gagal sinkronisasi: Timeout saat menghubungkan ke API ${listing.channel.name}`,
          details: JSON.stringify({
            sellingPrice: listing.sellingPrice,
            stockQty: listing.stockQty,
            channel: listing.channel.name,
          }),
          createdAt: new Date(Date.now() - daysAgo * 86400000 - Math.random() * 86400000),
        }
      });
    }
  }

  console.log('--- MARKETPLACE SEEDING COMPLETE ---');
  console.log(`Created ${channels.length} channels and ${listingData.length} listings`);
}

// CLI execution
if (require.main === module) {
  const tenantId = process.argv[2];

  if (!tenantId) {
    console.error('Usage: bun prisma/seed-marketplace.ts <tenantId>');
    process.exit(1);
  }

  seedMarketplace(tenantId)
    .then(() => prisma.$disconnect())
    .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
}
