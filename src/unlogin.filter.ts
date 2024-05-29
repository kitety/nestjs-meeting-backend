import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

export class UnLoginException {
  message: string;

  constructor(message?) {
    this.message = message;
  }
}

@Catch()
export class UnLoginFilter<T> implements ExceptionFilter {
  catch(exception: UnLoginException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response
      .json({
        code: response.statusCode,
        message: 'fail',
        data: exception.message || '用户未登陆',
      })
      .end();
  }
}
