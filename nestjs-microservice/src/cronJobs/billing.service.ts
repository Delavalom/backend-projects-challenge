import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { createTransport } from "nodemailer";
import { PrismaService } from "../prisma.service";

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  constructor(
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
    private prisma: PrismaService
  ) {}

  @Cron("0 0 0 0/15 * *", {
    name: "updated_billing",
  })
  async billing() {
    try {
      await this.prisma.salary.updateMany({
        data: {
          billing: new Date("2023-02-02"),
        },
      });

      const data = await this.prisma.salary.findMany()

      const transporter = createTransport({
        service: "hotmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      })

      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: process.env.SENDER_EMAIL,
        subject: 'Sending hotmail',
        text: JSON.stringify(data),
      }, (err, info) => {
        if (err) throw new Error("something went bad with the send")

        this.logger.debug(info.response)
      })
  
      this.logger.debug("Called At 12:00 AM, every 15 days, starting on day of the month");
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message)
      }
      this.logger.error(error)
    }
  }
}
