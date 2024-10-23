import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const skillsData = [
  {
    nameEn: 'Database Management',
    nameTh: 'การจัดการฐานข้อมูล',
  },
  {
    nameEn: 'Cybersecurity',
    nameTh: 'ความปลอดภัยทางไซเบอร์',
  },
  // ... (include all the skills from your JSON here)
];

async function main() {
  console.log('Start seeding skills...');

  const createdSkills = await prisma.skill.createMany({
    data: skillsData,
    skipDuplicates: true,
  });

  console.log(`Seeded ${createdSkills.count} skills`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
