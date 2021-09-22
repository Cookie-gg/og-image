import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LemonModule } from './lemon/lemon.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LemonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.PORT ? 'prodcution' : 'development'}`],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
