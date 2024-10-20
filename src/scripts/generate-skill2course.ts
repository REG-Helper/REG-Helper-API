import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const skillCourseMappingsData = [
  {
      'from': 'Database Management',
      'fromTh': 'การจัดการฐานข้อมูล',
      'fromType': 'skill',
      'to': 'SOFTWARE STUDIO',
      'toTh': 'สตูดิโอซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Cybersecurity',
      'fromTh': 'ความปลอดภัยทางไซเบอร์',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Database Management',
      'fromTh': 'การจัดการฐานข้อมูล',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Analysis',
      'fromTh': 'การวิเคราะห์ซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Network Configuration',
      'fromTh': 'การตั้งค่าเครือข่าย',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'COMPUTER ENGINEERING PROJECT PREPARATION',
      'toTh': 'การเตรียมโครงงานวิศวกรรมคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'MICROCONTROLLER APPLICATION AND DEVELOPMENT',
      'toTh': 'การประยุกต์และพัฒนาไมโครคอนโทรลเลอร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'UX/UI Design',
      'fromTh': 'การออกแบบหน้าตาและประสบการณ์ของผู้ใช้งาน',
      'fromType': 'skill',
      'to': 'USER EXPERIENCE AND USER INTERFACE DESIGN',
      'toTh': 'การออกแบบประสบการณ์และส่วนติดต่อผู้ใช้',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'OPERATING SYSTEMS',
      'toTh': 'ระบบปฎิบัติการ',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Database Management',
      'fromTh': 'การจัดการฐานข้อมูล',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'API',
      'fromTh': 'เอพีไอ',
      'fromType': 'skill',
      'to': 'SOFTWARE STUDIO',
      'toTh': 'สตูดิโอซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Coding',
      'fromTh': 'การเขียนโปรแกรม',
      'fromType': 'skill',
      'to': 'PROGRAMMING FUNDAMENTAL',
      'toTh': 'พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Testing & Quality Assurance',
      'fromTh': 'การทดสอบ และ การประกันคุณภาพ',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Database Design',
      'fromTh': 'การออกแบบฐานข้อมูล',
      'fromType': 'skill',
      'to': 'ADVANCED DATABASE SYSTEMS',
      'toTh': 'ระบบฐานข้อมูลขั้นสูง',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Algorithms',
      'fromTh': ' อัลกอริทึม',
      'fromType': 'skill',
      'to': 'DATA STRUCTURES AND ALGORITHM',
      'toTh': 'โครงสร้างข้อมูลและอัลกอริทึม',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Microcontroller',
      'fromTh': 'ความรู้เกี่ยวกับไมโครคอนโทรลเลอร์',
      'fromType': 'skill',
      'to': 'MICROCONTROLLER APPLICATION AND DEVELOPMENT',
      'toTh': 'การประยุกต์และพัฒนาไมโครคอนโทรลเลอร์',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'COMPUTER HARDWARE DESIGN',
      'toTh': 'การออกแบบทางฮาร์ดแวร์คอมพิวเตอร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Network Infrastructure Design',
      'fromTh': 'การวางโครงสร้างระบบเครือข่าย',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Requirement Gathering',
      'fromTh': 'การรวบรวมความต้องการ',
      'fromType': 'skill',
      'to': 'COMPUTER HARDWARE DESIGN',
      'toTh': 'การออกแบบทางฮาร์ดแวร์คอมพิวเตอร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'PROGRAMMING FUNDAMENTAL',
      'toTh': 'พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Database Design',
      'fromTh': 'การออกแบบฐานข้อมูล',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'CIRCUITS AND ELECTRONICS',
      'toTh': 'วงจรไฟฟ้าและอิเล็กทรอนิกส์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Data Structures',
      'fromTh': 'โครงสร้างข้อมูล',
      'fromType': 'skill',
      'to': 'OBJECT ORIENTED DATA STRUCTURES',
      'toTh': 'โครงสร้างข้อมูลเชิงวัตถุ',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'ELEMENTARY DIFFERENTIAL EQUATIONS AND LINEAR ALGEBRA',
      'toTh': 'สมการอนุพันธ์และพีชคณิตเชิงเส้นพื้นฐาน',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Cloud Computing',
      'fromTh': 'การประมวลผลแบบคลาวด์',
      'fromType': 'skill',
      'to': 'INTRODUCTION TO CLOUD ARCHITECTURE',
      'toTh': 'เบื้องต้นสถาปัตยกรรมคลาวด์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Database Management',
      'fromTh': 'การจัดการฐานข้อมูล',
      'fromType': 'skill',
      'to': 'ADVANCED DATABASE SYSTEMS',
      'toTh': 'ระบบฐานข้อมูลขั้นสูง',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'API',
      'fromTh': 'เอพีไอ',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Data Visualization',
      'fromTh': '้การสร้างภาพข้อมูล',
      'fromType': 'skill',
      'to': 'ELEMENTARY DIFFERENTIAL EQUATIONS AND LINEAR ALGEBRA',
      'toTh': 'สมการอนุพันธ์และพีชคณิตเชิงเส้นพื้นฐาน',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'COMPUTER NETWORKS',
      'toTh': 'เครือข่ายคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Analysis',
      'fromTh': 'การวิเคราะห์ซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'SOFTWARE ARCHITECTURE AND DESIGN',
      'toTh': 'สถาปัตยกรรมและการออกแบบซอฟต์แวร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Network Infrastructure Design',
      'fromTh': 'การวางโครงสร้างระบบเครือข่าย',
      'fromType': 'skill',
      'to': 'INTERNETWORKING STANDARDS AND TECHNOLOGIES',
      'toTh': 'มาตรฐานและเทคโนโลยีเครือข่าย',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'INTRODUCTION TO COMPUTER ENGINEERING',
      'toTh': 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Testing & Quality Assurance',
      'fromTh': 'การทดสอบ และ การประกันคุณภาพ',
      'fromType': 'skill',
      'to': 'SYSTEM REQUIREMENTS ENGINEERING',
      'toTh': 'วิศวกรรมความต้องการของระบบ',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Architecture Design ',
      'fromTh': 'การออกแบบทางสถาปัตยกรรม',
      'fromType': 'skill',
      'to': 'SOFTWARE STUDIO',
      'toTh': 'สตูดิโอซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Data Analysis',
      'fromTh': 'การวิเคราะห์ข้อมูล',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'OBJECT ORIENTED PROGRAMMING',
      'toTh': 'การเขียนโปรแกรมเชิงวัตถุ',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Data Visualization',
      'fromTh': '้การสร้างภาพข้อมูล',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'DATA STRUCTURES AND ALGORITHM',
      'toTh': 'โครงสร้างข้อมูลและอัลกอริทึม',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Cybersecurity',
      'fromTh': 'ความปลอดภัยทางไซเบอร์',
      'fromType': 'skill',
      'to': 'INFORMATION AND COMPUTER SECURITY',
      'toTh': 'ความมั่นคงข้อมูลและคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'MICROCONTROLLER PROJECT',
      'toTh': 'ไมโครคอนโทรลเลอร์โปรเจ็ค',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Architecture Design ',
      'fromTh': 'การออกแบบทางสถาปัตยกรรม',
      'fromType': 'skill',
      'to': 'SOFTWARE ARCHITECTURE AND DESIGN',
      'toTh': 'สถาปัตยกรรมและการออกแบบซอฟต์แวร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Architecture Design ',
      'fromTh': 'การออกแบบทางสถาปัตยกรรม',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'DIGITAL SYSTEM FUNDAMENTALS',
      'toTh': 'พื้นฐานระบบดิจิตอล',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Network Configuration',
      'fromTh': 'การตั้งค่าเครือข่าย',
      'fromType': 'skill',
      'to': 'INTERNETWORKING STANDARDS AND TECHNOLOGIES',
      'toTh': 'มาตรฐานและเทคโนโลยีเครือข่าย',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Network Infrastructure Design',
      'fromTh': 'การวางโครงสร้างระบบเครือข่าย',
      'fromType': 'skill',
      'to': 'SYSTEM PLATFORM ADMINISTRATION',
      'toTh': 'การดูแลแพลทฟอร์มระบบ',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'UX/UI Design',
      'fromTh': 'การออกแบบหน้าตาและประสบการณ์ของผู้ใช้งาน',
      'fromType': 'skill',
      'to': 'HUMAN COMPUTER INTERACTION',
      'toTh': 'การปฏิสัมพันธ์ระหว่างมนุษย์และคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Architecture Design ',
      'fromTh': 'การออกแบบทางสถาปัตยกรรม',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'API',
      'fromTh': 'เอพีไอ',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Algorithms',
      'fromTh': ' อัลกอริทึม',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Data Visualization',
      'fromTh': '้การสร้างภาพข้อมูล',
      'fromType': 'skill',
      'to': 'DATA MINING',
      'toTh': 'เหมืองข้อมูล',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Database Management',
      'fromTh': 'การจัดการฐานข้อมูล',
      'fromType': 'skill',
      'to': 'DATABASE SYSTEMS',
      'toTh': 'ระบบฐานข้อมูล',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'SYSTEM PLATFORM ADMINISTRATION',
      'toTh': 'การดูแลแพลทฟอร์มระบบ',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'DIGITAL SYSTEM FUNDAMENTALS',
      'toTh': 'พื้นฐานระบบดิจิตอล',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Requirement Gathering',
      'fromTh': 'การรวบรวมความต้องการ',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Data Analysis',
      'fromTh': 'การวิเคราะห์ข้อมูล',
      'fromType': 'skill',
      'to': 'INTRODUCTION TO DATA ANALYTICS',
      'toTh': 'การวิเคราะห์ข้อมูลเบื้องต้น',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'COMPUTER ORGANIZATION AND ASSEMBLY LANGUAGE',
      'toTh': 'องค์ประกอบคอมพิวเตอร์และภาษาแอสเซมบลี',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'USER EXPERIENCE AND USER INTERFACE DESIGN',
      'toTh': 'การออกแบบประสบการณ์และส่วนติดต่อผู้ใช้',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'UX/UI Design',
      'fromTh': 'การออกแบบหน้าตาและประสบการณ์ของผู้ใช้งาน',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 4
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'INTRODUCTION TO COMPUTER ENGINEERING',
      'toTh': 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Design Verification',
      'fromTh': 'การตรวจสอบการออกแบบ',
      'fromType': 'skill',
      'to': 'COMPUTER HARDWARE DESIGN',
      'toTh': 'การออกแบบทางฮาร์ดแวร์คอมพิวเตอร์',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Software Analysis',
      'fromTh': 'การวิเคราะห์ซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'COMPUTER ENGINEERING PROFESSIONAL DEVELOPMENT',
      'toTh': 'การพัฒนาทักษะทางวิชาชีพวิศวกรรมคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Data Structures',
      'fromTh': 'โครงสร้างข้อมูล',
      'fromType': 'skill',
      'to': 'PROGRAMMING FUNDAMENTAL',
      'toTh': 'พื้นฐานการเขียนโปรแกรมคอมพิวเตอร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Database Design',
      'fromTh': 'การออกแบบฐานข้อมูล',
      'fromType': 'skill',
      'to': 'DATABASE SYSTEMS',
      'toTh': 'ระบบฐานข้อมูล',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Testing & Quality Assurance',
      'fromTh': 'การทดสอบ และ การประกันคุณภาพ',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Data Structures',
      'fromTh': 'โครงสร้างข้อมูล',
      'fromType': 'skill',
      'to': 'OBJECT ORIENTED PROGRAMMING',
      'toTh': 'การเขียนโปรแกรมเชิงวัตถุ',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Cloud Computing',
      'fromTh': 'การประมวลผลแบบคลาวด์',
      'fromType': 'skill',
      'to': 'SYSTEM PLATFORM ADMINISTRATION',
      'toTh': 'การดูแลแพลทฟอร์มระบบ',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'API',
      'fromTh': 'เอพีไอ',
      'fromType': 'skill',
      'to': 'MICROSERVICES AND REST API DESIGN',
      'toTh': 'การออกแบบไมโครเซอร์วิสและเรสต์เอพีไอ',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Requirement Gathering',
      'fromTh': 'การรวบรวมความต้องการ',
      'fromType': 'skill',
      'to': 'SOFTWARE DEVELOPMENT PROCESSES',
      'toTh': 'กระบวนการพัฒนาซอฟต์แวร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'COMPUTER HARDWARE DESIGN',
      'toTh': 'การออกแบบทางฮาร์ดแวร์คอมพิวเตอร์',
      'toType': 'subject',
      'weight': 4
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'INTERNETWORKING STANDARDS AND TECHNOLOGIES',
      'toTh': 'มาตรฐานและเทคโนโลยีเครือข่าย',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Electronics',
      'fromTh': 'อิเล็กทรอนิกส์',
      'fromType': 'skill',
      'to': 'ADVANCED DIGITAL DESIGN USING HDL',
      'toTh': 'การออกแบบดิจิตอลขั้นสูงโดยใช้เฮชดีแอล',
      'toType': 'subject',
      'weight': 4
  },
  {
      'from': 'API',
      'fromTh': 'เอพีไอ',
      'fromType': 'skill',
      'to': 'SOFTWARE ARCHITECTURE AND DESIGN',
      'toTh': 'สถาปัตยกรรมและการออกแบบซอฟต์แวร์',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'SOFTWARE STUDIO',
      'toTh': 'สตูดิโอซอฟต์แวร์',
      'toType': 'subject',
      'weight': 2
  },
  {
      'from': 'Cloud Computing',
      'fromTh': 'การประมวลผลแบบคลาวด์',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Software Tools',
      'fromTh': 'เครื่องมือซอฟต์แวร์',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 4
  },
  {
      'from': 'Microcontroller',
      'fromTh': 'ความรู้เกี่ยวกับไมโครคอนโทรลเลอร์',
      'fromType': 'skill',
      'to': 'INTRODUCTION TO COMPUTER ENGINEERING',
      'toTh': 'วิศวกรรมคอมพิวเตอร์เบื้องต้น',
      'toType': 'subject',
      'weight': 1
  },
  {
      'from': 'Data Structures',
      'fromTh': 'โครงสร้างข้อมูล',
      'fromType': 'skill',
      'to': 'DATA STRUCTURES AND ALGORITHM',
      'toTh': 'โครงสร้างข้อมูลและอัลกอริทึม',
      'toType': 'subject',
      'weight': 3
  },
  {
      'from': 'Coding',
      'fromTh': 'การเขียนโปรแกรม',
      'fromType': 'skill',
      'to': 'CO-OPERATIVE EDUCATION',
      'toTh': 'สหกิจศึกษา',
      'toType': 'subject',
      'weight': 5
  },
  {
      'from': 'Coding',
      'fromTh': 'การเขียนโปรแกรม',
      'fromType': 'skill',
      'to': 'OBJECT ORIENTED PROGRAMMING',
      'toTh': 'การเขียนโปรแกรมเชิงวัตถุ',
      'toType': 'subject',
      'weight': 3
  }
];

async function main() {
  console.log('Start seeding skill-job mappings...');

  const createdMappings = await prisma.skillCourseMapping.createMany({
    data: skillCourseMappingsData,
    skipDuplicates: true,
  });

  console.log(`Seeded ${createdMappings.count} skill-course mappings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });