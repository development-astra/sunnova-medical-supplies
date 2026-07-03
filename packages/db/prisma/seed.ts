import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Gloves & PPE', slug: 'gloves-ppe', description: 'Nitrile, latex, and vinyl examination gloves. Masks, gowns, face shields.', sortOrder: 1 },
  { name: 'Syringes & Needles', slug: 'syringes-needles', description: 'Sterile syringes, hypodermic needles, insulin syringes, safety devices.', sortOrder: 2 },
  { name: 'Wound Care', slug: 'wound-care', description: 'Gauze, bandages, dressings, sutures, wound closure strips.', sortOrder: 3 },
  { name: 'Exam & Diagnostic', slug: 'exam-diagnostic', description: 'Exam table paper, otoscopes, stethoscopes, blood pressure cuffs.', sortOrder: 4 },
  { name: 'Aesthetic Supplies', slug: 'aesthetic-supplies', description: 'Needles for filler, cannulas, IV supplies, anesthesia items for aesthetic practices.', sortOrder: 5 },
];

const PRODUCTS_BY_CATEGORY: Record<string, Array<{ name: string; sku: string; price: number; description: string; variants?: Array<{ name: string; sku: string; price: number }> }>> = {
  'gloves-ppe': [
    {
      name: 'Nitrile Exam Gloves',
      sku: 'GLV-NIT-M',
      price: 1850,
      description: 'Powder-free nitrile examination gloves. AQL 1.5. 200 per box.',
      variants: [
        { name: 'Small — Box of 200', sku: 'GLV-NIT-S-200', price: 1850 },
        { name: 'Medium — Box of 200', sku: 'GLV-NIT-M-200', price: 1850 },
        { name: 'Large — Box of 200', sku: 'GLV-NIT-L-200', price: 1850 },
        { name: 'XL — Box of 200', sku: 'GLV-NIT-XL-200', price: 1950 },
      ],
    },
    {
      name: 'Vinyl Exam Gloves',
      sku: 'GLV-VNL-M',
      price: 1450,
      description: 'Powder-free vinyl examination gloves. 100 per box.',
      variants: [
        { name: 'Small — Box of 100', sku: 'GLV-VNL-S-100', price: 1450 },
        { name: 'Medium — Box of 100', sku: 'GLV-VNL-M-100', price: 1450 },
        { name: 'Large — Box of 100', sku: 'GLV-VNL-L-100', price: 1450 },
      ],
    },
    { name: 'Surgical Mask ASTM Level 2', sku: 'MSK-SRG-L2', price: 599, description: '3-ply surgical masks. ASTM Level 2. Pack of 50.' },
    { name: 'KN95 Respirator Mask', sku: 'MSK-KN95', price: 1200, description: 'GB2626-2019 standard. Pack of 20.' },
  ],
  'syringes-needles': [
    {
      name: 'Luer Lock Syringe 3mL',
      sku: 'SYR-LL-3ML',
      price: 2400,
      description: 'Sterile Luer lock tip syringe. 100 per box.',
      variants: [
        { name: '1mL — Box of 100', sku: 'SYR-LL-1ML-100', price: 2200 },
        { name: '3mL — Box of 100', sku: 'SYR-LL-3ML-100', price: 2400 },
        { name: '5mL — Box of 100', sku: 'SYR-LL-5ML-100', price: 2600 },
        { name: '10mL — Box of 100', sku: 'SYR-LL-10ML-100', price: 2800 },
      ],
    },
    {
      name: 'Hypodermic Needle 25G',
      sku: 'NDL-25G-1',
      price: 1800,
      description: 'Thin wall hypodermic needle. Box of 100.',
      variants: [
        { name: '25G × 1" — Box of 100', sku: 'NDL-25G-1-100', price: 1800 },
        { name: '27G × 1.25" — Box of 100', sku: 'NDL-27G-125-100', price: 1900 },
        { name: '30G × 0.5" — Box of 100', sku: 'NDL-30G-05-100', price: 2000 },
      ],
    },
    { name: 'Insulin Syringe 1mL 28G', sku: 'SYR-INS-28G', price: 1650, description: 'U-100 insulin syringe. 28G × ½". Box of 100.' },
    { name: 'Safety Retractable Syringe 3mL', sku: 'SYR-SF-3ML', price: 3200, description: 'Auto-retractable needle safety syringe. Box of 50.' },
  ],
  'wound-care': [
    {
      name: 'Gauze Sponge 4×4',
      sku: 'GZS-4X4-ST',
      price: 975,
      description: 'Sterile woven gauze sponge. 8-ply. Pack of 50.',
      variants: [
        { name: '2×2 Sterile — Pack of 50', sku: 'GZS-2X2-ST-50', price: 850 },
        { name: '4×4 Sterile — Pack of 50', sku: 'GZS-4X4-ST-50', price: 975 },
        { name: '4×8 Sterile — Pack of 50', sku: 'GZS-4X8-ST-50', price: 1100 },
      ],
    },
    { name: 'Medical Tape 1" Paper', sku: 'TPE-PPR-1', price: 399, description: 'Hypoallergenic paper medical tape. 10 yards. Pack of 12 rolls.' },
    { name: 'Cohesive Bandage 2"', sku: 'BND-COH-2', price: 1250, description: 'Self-adhesive cohesive wrap. 5 yards each. Pack of 12 rolls.' },
    { name: 'Wound Closure Strips', sku: 'WCS-STR-14', price: 650, description: '1/4" × 3" sterile closure strips. Box of 100 strips.' },
  ],
  'exam-diagnostic': [
    {
      name: 'Exam Table Paper 21"',
      sku: 'ETP-21-225',
      price: 2200,
      description: 'Smooth crepe exam table paper. 21" × 225 ft. Pack of 12 rolls.',
      variants: [
        { name: '18" × 225ft — 12 rolls', sku: 'ETP-18-225-12', price: 1950 },
        { name: '21" × 225ft — 12 rolls', sku: 'ETP-21-225-12', price: 2200 },
        { name: '27" × 225ft — 12 rolls', sku: 'ETP-27-225-12', price: 2500 },
      ],
    },
    { name: 'Alcohol Prep Pads', sku: 'APP-70-200', price: 699, description: '70% isopropyl alcohol. Sterile. Box of 200.' },
    { name: 'Disposable Tongue Depressors', sku: 'TDR-DISP-100', price: 450, description: 'Standard wooden tongue depressors. Pack of 100.' },
    { name: 'Disposable Probe Covers', sku: 'PCO-DISP-100', price: 850, description: 'Universal fit disposable probe covers. Pack of 100.' },
  ],
  'aesthetic-supplies': [
    {
      name: 'Microcannula 25G',
      sku: 'CAN-25G-50',
      price: 4800,
      description: 'Blunt-tip microcannula for filler. Box of 20.',
      variants: [
        { name: '22G × 50mm — Box of 20', sku: 'CAN-22G-50-20', price: 5200 },
        { name: '25G × 50mm — Box of 20', sku: 'CAN-25G-50-20', price: 4800 },
        { name: '27G × 38mm — Box of 20', sku: 'CAN-27G-38-20', price: 4500 },
      ],
    },
    { name: 'Topical Anesthetic EMLA Cream', sku: 'ANS-EMLA-5G', price: 1200, description: 'Topical analgesic cream. 5g single-use packets. Pack of 12.' },
    { name: 'IV Catheter 20G', sku: 'IVC-20G-114', price: 2600, description: 'Peripheral IV catheter with safety device. 20G × 1.14". Box of 50.' },
    { name: 'Sterile Drape Field', sku: 'DRP-STR-18', price: 1800, description: 'Fenestrated sterile drape. 18" × 18". Pack of 10.' },
  ],
};

async function main() {
  console.log('Seeding database…');

  // Admin user
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? 'admin@sunnovamedical.com';
  const adminPass = process.env.ADMIN_SEED_PASSWORD ?? 'Admin1234!';
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPass, 12),
      firstName: 'Isabella',
      lastName: 'Lara',
      businessName: 'Sunnova Medical Supplies',
      role: 'ADMIN',
      emailVerified: true,
    },
  });
  console.log('✓ Admin user created');

  // Customer user — for developers to inspect the customer dashboard (/account).
  // Matches the mock dashboard profile (Dr. Amanda Lee · Wellness Med Spa).
  const customerEmail = process.env.CUSTOMER_SEED_EMAIL ?? 'customer@sunnovamedical.com';
  const customerPass = process.env.CUSTOMER_SEED_PASSWORD ?? 'SunnovaCustomer2026!';
  await prisma.user.upsert({
    where: { email: customerEmail },
    update: {},
    create: {
      email: customerEmail,
      passwordHash: await bcrypt.hash(customerPass, 12),
      firstName: 'Amanda',
      lastName: 'Lee',
      businessName: 'Wellness Med Spa',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });
  console.log(`✓ Customer user created (${customerEmail})`);

  // Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }
  console.log('✓ Categories seeded');

  // Products
  for (const [categorySlug, products] of Object.entries(PRODUCTS_BY_CATEGORY)) {
    const categoryId = categoryMap[categorySlug];
    for (const p of products) {
      const { variants, ...productData } = p;
      const product = await prisma.product.upsert({
        where: { sku: productData.sku },
        update: { ...productData, price: productData.price / 100, categoryId },
        create: { ...productData, price: productData.price / 100, categoryId, slug: productData.sku.toLowerCase().replace(/_/g, '-') },
      });
      if (variants) {
        for (const v of variants) {
          await prisma.productVariant.upsert({
            where: { sku: v.sku },
            update: { name: v.name, price: v.price / 100 },
            create: { productId: product.id, name: v.name, sku: v.sku, price: v.price / 100 },
          });
        }
      }
    }
  }
  console.log('✓ Products and variants seeded');

  console.log('Seed complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
