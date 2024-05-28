import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RedisService } from '../redis/redis.service';
import { EmailService } from '../email/email.service';

@Controller('user')
export class UserController {
  @Inject(EmailService)
  private emailService: EmailService;
  @Inject(RedisService)
  private redisService: RedisService;

  constructor(private readonly userService: UserService) {}

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code);
    await this.emailService.sendMail({
      to: address,
      subject: '会议室预定系统注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`,
    });
    return '验证码发送成功';
  }

  // 注册
  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    console.log({ registerUserDto });
    return this.userService.register(registerUserDto);
  }
}
