// 1. تحميل متغيرات البيئة من ملف .env
require('dotenv').config();

// 2. استيراد الـ prisma client من ملف الـ config الخاص بمشروعك
const prisma = require("../src/config/prisma"); 
const { faker } = require('@faker-js/faker');

async function main() {
  console.log("Cleaning database...");
  // حذف البيانات بالترتيب لتجنب مشاكل الـ Foreign Keys
  await prisma.userSkill.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.teamInvitation.deleteMany();
  await prisma.teamSkill.deleteMany();
  await prisma.team.deleteMany();
  await prisma.matchingRequest.deleteMany();
  await prisma.hackathon.deleteMany();
  await prisma.user.deleteMany();
  await prisma.skill.deleteMany();

  console.log("Generating data...");

  // 3. إنشاء المهارات الأساسية
  const skills = await Promise.all(['React', 'Node.js', 'Python', 'AI', 'Design'].map(name => 
    prisma.skill.create({ data: { name } })
  ));

  // 4. إنشاء الهكاثون
  const hackathon = await prisma.hackathon.create({
    data: { 
      title: 'Global AI Hack 2026', 
      applyLink: 'https://hack.com', 
      status: 'ONGOING' 
    }
  });

  // 5. إنشاء 10 مستخدمين عشوائيين
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        bio: faker.lorem.sentence(),
        isVerified: true
      }
    });
    users.push(user);
  }

  // 6. إنشاء 5 فرق وتوزيع المستخدمين عليها
  for (let i = 0; i < 5; i++) {
    const owner = users[i];
    const team = await prisma.team.create({
      data: {
        name: `${faker.commerce.productAdjective()} Developers`,
        hackathonId: hackathon.id,
        ownerId: owner.id,
        status: 'FORMING',
        members: { create: { userId: owner.id } }
      }
    });

    // إضافة عضو إضافي لكل فريق
    await prisma.teamMember.create({
      data: { teamId: team.id, userId: users[i + 5].id }
    });
  }

  // 7. إنشاء طلبات مطابقة لبعض المستخدمين
  for (let i = 0; i < 3; i++) {
    await prisma.matchingRequest.create({
      data: {
        userId: users[i].id,
        hackathonId: hackathon.id,
        status: 'PROCESSING'
      }
    });
  }

  console.log("Seed complete! 10 users, 5 teams, and 3 matching requests created.");
}

main()
  .catch((e) => { 
    console.error("Error during seeding:", e); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });