// src/scripts/seed-courses.ts

const coursesData = [
  {
    id: '01006010',
    nameEn: 'ENGINEERING MECHANICS',
    nameTh: 'กลศาสตร์วิศวกรรม',
    descriptionEn: 'Force systems, resultant, equilibrium, fluid statics, kinematics and kinetics of particles and rigid bodies, Newtons second law of motion, work and energy, impulse and momentum.',
    descriptionTh: 'ระบบของแรง แรงลัพธ์ สมดุล สถิตย์ศาสตร์ของไหล จลน์ศาสตร์และพลศาสตร์ของอนุภาคและวัตถุเกร็ง กฎข้อที่สองของนิวตัน งานและพลังงาน แรงดลและโมเมนตัม',
    credit: 3,
    creditStr: '3(3-0-6)',
    group: 'MAJOR',
    subGroup: 'REQUIRED',
    sections: {
      create: [
        {
          name: '41',
          day: 'WEDNESDAY',
          startAt: '16:30:00',
          endAt: '20:00:00',
          room: 'ME-303',
          type: 'LECTURE',
          year: 2565,
          semester: 1,
          limit: null,
          count: 18,
          condition: 'เฉพาะนักศึกษาเก็บตกเท่านั้น',
          sectionTeachers: {
            create: [
              {
                teacher: {
                  connectOrCreate: {
                    where: { firstnameTh_lastnameTh: { firstnameTh: 'สยาม', lastnameTh: 'สงวนรัมย์' } },
                    create: { firstnameTh: 'สยาม', lastnameTh: 'สงวนรัมย์' }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: '01006012',
    nameEn: 'COMPUTER PROGRAMMING',
    nameTh: 'การเขียนโปรแกรมคอมพิวเตอร์',
    descriptionEn: 'Basic computer architecture; computer system component; hardware and software interaction; electronic data processing concepts; program design and development methodology; levels of computer languages; compiler; computer programming using high level language; component of statement e.g. constant, variable, operator, expression, data types; sequential statement; control statement; iteration statement; computer application; practice in using program development tools; program testing and debugging.',
    descriptionTh: 'สถาปัตยกรรมคอมพิวเตอร์เบื้องต้น องค์ประกอบของระบบคอมพิวเตอร์ การปฏิสัมพันธ์ระหว่างฮาร์ดแวร์และซอฟต์แวร์ การประมวลผลข้อมูล การออกแบบและขั้นตอนการพัฒนาโปรแกรม ระดับของภาษาคอมพิวเตอร์ตัวแปลภาษา การเขียนโปรแกรมด้วยคอมพิวเตอร์ระดับสูง องค์ประกองของประโยคคำสั่ง เช่น ค่าคงที่ตัวแปร เครื่องหมายกระทำการนิพจน์ ชนิดของข้อมูลแบบต่างๆ คำสั่งแบบตามลำดับ แบบกำหนดเงื่อนไขและแบบวนซ้ำ การประยุกต์ใช้คอมพิวเตอร์ในงานต่างๆ การฝึกปฏิบัติเกี่ยวกับการใช้เครื่องมือในการพัฒนาโปรแกรม การตรวจสอบ ทดสอบและแก้ไขโปรแกรม',
    credit: 3,
    creditStr: '3(2-2-5)',
    group: 'MAJOR',
    subGroup: 'REQUIRED',
    sections: {
      create: [
        {
          name: '108',
          day: 'FRIDAY',
          startAt: '10:00:00',
          endAt: '12:00:00',
          room: 'ECC-CE706',
          type: 'LECTURE',
          year: 2565,
          semester: 1,
          limit: 50,
          count: 46,
          condition: 'เฉพาะนักศึกษาเก็บตกเท่านั้น',
          sectionTeachers: {
            create: [
              {
                teacher: {
                  connectOrCreate: {
                    where: { firstnameTh_lastnameTh: { firstnameTh: 'คณัฐ', lastnameTh: 'ตังติสานนท์' } },
                    create: { firstnameTh: 'คณัฐ', lastnameTh: 'ตังติสานนท์' }
                  }
                }
              },
              {
                teacher: {
                  connectOrCreate: {
                    where: { firstnameTh_lastnameTh: { firstnameTh: 'เกียรติณรงค์', lastnameTh: 'ทองประเสริฐ' } },
                    create: { firstnameTh: 'เกียรติณรงค์', lastnameTh: 'ทองประเสริฐ' }
                  }
                }
              }
            ]
          }
        },
        {
          name: '8',
          day: 'FRIDAY',
          startAt: '08:00:00',
          endAt: '10:00:00',
          room: 'ECC-CE802',
          type: 'LECTURE',
          year: 2565,
          semester: 1,
          limit: 50,
          count: 46,
          condition: 'เฉพาะนักศึกษาเก็บตกเท่านั้น',
          sectionTeachers: {
            create: [
              {
                teacher: {
                  connectOrCreate: {
                    where: { firstnameTh_lastnameTh: { firstnameTh: 'เกียรติณรงค์', lastnameTh: 'ทองประเสริฐ' } },
                    create: { firstnameTh: 'เกียรติณรงค์', lastnameTh: 'ทองประเสริฐ' }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  // Add the remaining courses here...
];

async function main() {
  console.log('Start seeding courses...');

  for (const course of coursesData) {
    console.log('Seeding course:', course);

  }

  console.log('Seeding courses finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });