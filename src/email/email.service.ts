import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false otherwise
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // For testing only: allow self-signed certificates
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10 seconds
  });

  async sendVerificationEmail(
    email: string,
    verificationUrl: string,
  ): Promise<void> {
    const mailOptions = {
      from: '"WearForecast" <wearforecast@gmail.com>',
      to: email,
      subject: '[WearForecast] 회원가입 이메일 인증 안내',
      text: `안녕하세요,
      
  WearForecast에 가입해 주셔서 감사합니다!
  회원가입을 완료하시려면 아래 링크를 클릭하여 이메일 주소를 인증해 주세요:
  
  ${verificationUrl}
  
  만약 본인이 회원가입을 신청하지 않으셨다면, 이 이메일을 무시해 주시기 바랍니다.
  
  감사합니다,
  WearForecast 팀`,
      html: `<p>안녕하세요,</p>
  <p>WearForecast에 가입해 주셔서 감사합니다!</p>
  <p>회원가입을 완료하시려면 <a href="${verificationUrl}">여기를 클릭</a>하여 이메일 주소를 인증해 주세요.</p>
  <p>만약 본인이 회원가입을 신청하지 않으셨다면, 이 이메일을 무시해 주시기 바랍니다.</p>
  <p>감사합니다,<br>WearForecast 팀</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email: ${error.message}`);
      throw error;
    }
  }
}
