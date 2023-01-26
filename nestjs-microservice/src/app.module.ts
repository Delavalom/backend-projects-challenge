import {
  CacheInterceptor,
  CacheModule,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { UploadFileModule } from "./upload/upload.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import config from "./config/configuration";
import { ScheduleModule } from "@nestjs/schedule";
import { BillingService } from "./cronJobs/billing.service";
import { PrismaService } from "./prisma.service";
import session from "express-session";
import * as passport from "passport";
import { RedisStore } from "./redis.store";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    UploadFileModule,
    CacheModule.register({
      // @ts-ignore
      store: RedisStore,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          // @ts-ignore
          store: RedisStore,
          cookie: {
            sameSite: true,
            httpOnly: true,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes("*");
  }
}
