import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const skillJobMappingsData = [
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Front-End Developer',
      'fromTh': 'นักพัฒนาฟรอนท์เอนด์',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'UX/UI Designer',
      'fromTh': 'นักออกแบบประสบการณ์และหน้าจอผู้ใช้',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Data Analysis',
      'toTh': 'การวิเคราะห์ข้อมูล',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Front-End Developer',
      'fromTh': 'นักพัฒนาฟรอนท์เอนด์',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 5
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'UX/UI Designer',
      'fromTh': 'นักออกแบบประสบการณ์และหน้าจอผู้ใช้',
      'fromType': 'job',
      'to': 'UX/UI Design',
      'toTh': 'การออกแบบหน้าตาและประสบการณ์ของผู้ใช้งาน',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Network Infrastructure Design',
      'toTh': 'การวางโครงสร้างระบบเครือข่าย',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Microcontroller',
      'toTh': 'ความรู้เกี่ยวกับไมโครคอนโทรลเลอร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 5
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Network Infrastructure Design',
      'toTh': 'การวางโครงสร้างระบบเครือข่าย',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Front-End Developer',
      'fromTh': 'นักพัฒนาฟรอนท์เอนด์',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Data Analysis',
      'toTh': 'การวิเคราะห์ข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Data Analysis',
      'toTh': 'การวิเคราะห์ข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Electronics',
      'toTh': 'อิเล็กทรอนิกส์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Network Infrastructure Design',
      'toTh': 'การวางโครงสร้างระบบเครือข่าย',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Design Verification',
      'toTh': 'การตรวจสอบการออกแบบ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Network Configuration',
      'toTh': 'การตั้งค่าเครือข่าย',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Electronics',
      'toTh': 'อิเล็กทรอนิกส์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Network Engineer',
      'fromTh': 'วิศวกรเครือข่าย',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Electronics',
      'toTh': 'อิเล็กทรอนิกส์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Data Engineer',
      'fromTh': 'วิศวกรข้อมูล',
      'fromType': 'job',
      'to': 'Data Analysis',
      'toTh': 'การวิเคราะห์ข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Front-End Developer',
      'fromTh': 'นักพัฒนาฟรอนท์เอนด์',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Database Admin',
      'fromTh': 'ผู้ดูแลฐานข้อมูล',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Architecture Design ',
      'toTh': 'การออกแบบทางสถาปัตยกรรม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'QA Engineer',
      'fromTh': 'วิศวกรประกันคุณภาพ',
      'fromType': 'job',
      'to': 'Database Management',
      'toTh': 'การจัดการฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Front-End Developer',
      'fromTh': 'นักพัฒนาฟรอนท์เอนด์',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'UX/UI Designer',
      'fromTh': 'นักออกแบบประสบการณ์และหน้าจอผู้ใช้',
      'fromType': 'job',
      'to': 'Data Visualization',
      'toTh': '้การสร้างภาพข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Desktop Application Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนเดสก์ทอป',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Back-End  Developer',
      'fromTh': 'นักพัฒนาแบ็กเอนด์',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'UX/UI Designer',
      'fromTh': 'นักออกแบบประสบการณ์และหน้าจอผู้ใช้',
      'fromType': 'job',
      'to': 'Software Tools',
      'toTh': 'เครื่องมือซอฟต์แวร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Data Analytic',
      'fromTh': 'นักวิเคราะห์ข้อมูล',
      'fromType': 'job',
      'to': 'Data Analysis',
      'toTh': 'การวิเคราะห์ข้อมูล',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'Requirement Gathering',
      'toTh': 'การรวบรวมความต้องการ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Coding',
      'toTh': 'การเขียนโปรแกรม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Software Analysis',
      'toTh': 'การวิเคราะห์ซอฟต์แวร์',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'System Engineer',
      'fromTh': 'วิศวกรระบบ',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IoT Engineer',
      'fromTh': 'วิศวกร ไอ โอ ที',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'Cybersecurity',
      'toTh': 'ความปลอดภัยทางไซเบอร์',
      'toType': 'skill',
      'weight': 4
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Mobile Developer',
      'fromTh': 'นักพัฒนาแอปพลิเคชั่นบนสมาร์ทโฟน',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 2
  },
  {
      'from': 'Security Engineer',
      'fromTh': 'วิศวกรความปลอดภัย',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Machine Learning Engineer',
      'fromTh': 'วิศวกรแมชชีนเลิร์นนิง',
      'fromType': 'job',
      'to': 'Database Design',
      'toTh': 'การออกแบบฐานข้อมูล',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'IT Support',
      'fromTh': 'ไอทีซัพพอร์ท',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Data Structures',
      'toTh': 'โครงสร้างข้อมูล',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Front-End Developer',
      'fromTh': 'นักพัฒนาฟรอนท์เอนด์',
      'fromType': 'job',
      'to': 'API',
      'toTh': 'เอพีไอ',
      'toType': 'skill',
      'weight': 1
  },
  {
      'from': 'Embedded System Engineer',
      'fromTh': 'วิศวกรระบบฝังตัว',
      'fromType': 'job',
      'to': 'Microcontroller',
      'toTh': 'ความรู้เกี่ยวกับไมโครคอนโทรลเลอร์',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Software engineer',
      'fromTh': 'วิศวกรซอฟต์แวร์',
      'fromType': 'job',
      'to': 'Algorithms',
      'toTh': ' อัลกอริทึม',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'DevOps Engineer',
      'fromTh': 'วิศวกรเดฟออปส์',
      'fromType': 'job',
      'to': 'Testing & Quality Assurance',
      'toTh': 'การทดสอบ และ การประกันคุณภาพ',
      'toType': 'skill',
      'weight': 3
  },
  {
      'from': 'Full-Stack Developer',
      'fromTh': 'นักพัฒนาโปรแกรมหน้าบ้าน และหลังบ้าน',
      'fromType': 'job',
      'to': 'Cloud Computing',
      'toTh': 'การประมวลผลแบบคลาวด์',
      'toType': 'skill',
      'weight': 1
  }
];

async function main() {
  console.log('Start seeding skill-job mappings...');

  const createdMappings = await prisma.skillJobMapping.createMany({
    data: skillJobMappingsData,
    skipDuplicates: true,
  });

  console.log(`Seeded ${createdMappings.count} skill-job mappings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });