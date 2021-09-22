import { Module } from '@nestjs/common';
import { LemonController } from './lemon.controller';
import { LemonService } from './lemon.service';

@Module({
  controllers: [LemonController],
  providers: [LemonService],
})
export class LemonModule {}
