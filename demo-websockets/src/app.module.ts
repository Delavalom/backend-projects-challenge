import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule],
})
export class AppModule {}
