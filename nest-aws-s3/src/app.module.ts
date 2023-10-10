import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AwsService],
})
export class AppModule {}
