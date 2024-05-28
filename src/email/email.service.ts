import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'qq',
      secure: true,
      auth: {
        user: '1048444579@qq.com',
        pass: '',
      },
    });
  }

  async sendMail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: '1048444579@qq.com',
      },
      to,
      subject,
      html,
    });
  }
}
