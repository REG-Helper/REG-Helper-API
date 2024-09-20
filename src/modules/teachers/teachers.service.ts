import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Teacher } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTeacherDto, UpdateTeacherDto } from './dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeachers(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany();
  }

  async getTeacherByIdOrThrow(teacherId: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return teacher;
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacherExists = await this.checkTeacherExist(createTeacherDto);

    if (teacherExists) {
      throw new ConflictException('Teacher already exist');
    }

    const createdTeacher = await this.prisma.teacher.create({
      data: createTeacherDto,
    });

    return createdTeacher;
  }

  async updateTeacher(teacherId: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    await this.getTeacherByIdOrThrow(teacherId);

    const teacherExists = await this.checkTeacherExist(updateTeacherDto, teacherId);

    if (teacherExists) {
      throw new ConflictException('Teacher already exists');
    }

    const updatedTeacher = await this.prisma.teacher.update({
      where: { id: teacherId },
      data: updateTeacherDto,
    });

    return updatedTeacher;
  }

  async deleteTeacher(teacherId: string): Promise<Teacher> {
    await this.getTeacherByIdOrThrow(teacherId);

    return this.prisma.teacher.delete({
      where: {
        id: teacherId,
      },
    });
  }

  private async checkTeacherExist(
    teacher: CreateTeacherDto | UpdateTeacherDto,
    excludeId?: string,
  ): Promise<Teacher | null> {
    const { firstnameEn, firstnameTh, lastnameEn, lastnameTh } = teacher;
    const teacherExists = await this.prisma.teacher.findFirst({
      where: {
        OR: [
          { firstnameEn, lastnameEn },
          { firstnameTh, lastnameTh },
        ],
        ...(excludeId && {
          NOT: {
            id: excludeId,
          },
        }),
      },
    });

    return teacherExists;
  }
}
