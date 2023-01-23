import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: "test_cron"
  })
  handleCron() {
    this.logger.debug('Called when the current second is 10');
  }

  dynamicCronJob() {
    const job = this.schedulerRegistry.getCronJob('test_cron')

    job.start()
    console.log(job.lastDate())
  }
}