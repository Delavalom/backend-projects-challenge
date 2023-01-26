import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { UploadFileModule } from "./upload/upload.module";
import { redisStore } from "cache-manager-redis-store";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration'
import { ScheduleModule } from "@nestjs/schedule";
import { BillingService } from "./cronJobs/billing.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [config]
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    UploadFileModule,
    CacheModule.register({
      // @ts-ignore
      store: async () =>
        await redisStore({
          password: process.env.REDIS_STORE_PASSWORD,
          socket: {
            host: 'redis-13809.c98.us-east-1-4.ec2.cloud.redislabs.com',
            port: 13809,
          },
        }),
      ttl: 0,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    // BillingService,
    PrismaService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}