import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto) {
    const report = this.reportRepository.create(reportDto);

    return this.reportRepository.save(report);
  }
}
