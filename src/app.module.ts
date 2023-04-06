import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { User } from './user/user.entitiy';
import { Report } from './report/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // file 기반의 DB
      database: 'db.sqlite', // root paht에 해당 이름의 DB 파일 생성 
      entities: [User, Report],
      synchronize: true,
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
