import * as crypto from 'crypto';
import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export const md5 = (text: string) => {
  const hash = crypto.createHash('md5');
  hash.update(text);
  return hash.digest('hex');
};

export function generateParseIntPipe(name: string) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(name + ' 应该传数字');
    },
  });
}
