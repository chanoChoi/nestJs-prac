import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/user/user.entitiy';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(reportDto);
    report.user = user; // set association
    return this.reportRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException(`Report Not found with id{${id}}`);
    }

    report.approved = approved;
    return this.reportRepository.save(report);
  }
}
