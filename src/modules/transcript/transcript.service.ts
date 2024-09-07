/* eslint-disable sonarjs/slow-regex */
import { Injectable } from '@nestjs/common';

import { Express } from 'express';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class TranscriptService {
    async uploadTranscript(file: Express.Multer.File) {
    
    const transcriptFull = await pdfParse(file.buffer);    
    const transcript = transcriptFull.text;
    
    if(!transcript) {
        return { success: false, message: 'Invalid file' };
    }

    // eslint-disable-next-line sonarjs/slow-regex
    const userName: string | null = /Name\s+(.+)\n/.exec(transcript)?.[1] ?? '';
    const dateOfBirth: string | null = /Date of Birth\s+(.+)Student/.exec(transcript)?.[1] ?? '';
    const studentId: string | null = /Student ID +(.+)\n/.exec(transcript)?.[1] ?? '';
    const degree: string | null = /Degree\s+(.+)/.exec(transcript)?.[1] ?? '';
    const major: string | null = /Major\s+(.+)/.exec(transcript)?.[1] ?? '';
    const regex = /(\d{8})(.*?)(\d)([ABCDEFWS]\+?)/g; 
    const user = {
        name: userName,
        dateOfBirth,
        studentId: parseInt(studentId),
        degree,
        major
    }

    user.dateOfBirth = dateOfBirth;
    user.studentId = parseInt(studentId);
    user.degree = degree;
    user.major = major;

    const matches = transcript.matchAll(regex);
    const courses: Array<object> = [];

    class Course {
        constructor(
            public code: number,
            public name: string,
            public credit: number,
            public grade: string
        ) {}
    }

    for (const match of matches) {
        const course = new Course(0,'',0,'');

        //to do check code to database
        
        course.credit = parseInt(match[3]);
        course.code = parseInt(match[1]);
        course.grade = match[4];
        course.name = match[2];
        courses.push(course);
    }
    
    return  courses;
    }
}

