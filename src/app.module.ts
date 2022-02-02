import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LemonModule } from './lemon/lemon.module';

@Module({
  imports: [LemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
