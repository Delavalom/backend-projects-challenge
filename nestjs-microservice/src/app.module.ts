import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UploadFileModule } from './upload/upload.module';

@Module({
  imports: [UsersModule, UploadFileModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
