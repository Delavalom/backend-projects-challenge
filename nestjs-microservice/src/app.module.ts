import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersController } from './users/controllers/controllers.controller';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersModule } from './users/users.module';
import { Service } from './users/services/users.service';
import { UsersController } from './users/controllers/users/users.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, ControllersController, UsersController],
  providers: [AppService, Service],
})
export class AppModule {}
