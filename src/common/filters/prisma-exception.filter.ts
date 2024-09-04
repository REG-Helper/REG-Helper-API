import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Prisma } from '@prisma/client';
import { Response } from 'express';

const prismaErrorMappings = new Map<string, { status: number; message: string }>([
  ['P2000', { status: HttpStatus.BAD_REQUEST, message: 'Input data is too long' }],
  ['P2001', { status: HttpStatus.NOT_FOUND, message: 'Record does not exist' }],
  ['P2002', { status: HttpStatus.CONFLICT, message: 'Reference already exists' }],
  ['P2003', { status: HttpStatus.CONFLICT, message: 'Foreign key constraint failed' }],
  ['P2025', { status: HttpStatus.NOT_FOUND, message: 'Record does not exist' }],
]);

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorCode = exception.code;
    const prismaError = prismaErrorMappings.get(errorCode);

    if (prismaError) {
      const { status, message } = prismaError;

      response.status(status).json({
        statusCode: status,
        message,
      });
    } else {
      super.catch(exception, host);
    }
  }
}
