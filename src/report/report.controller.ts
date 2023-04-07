import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard)
  @Post()
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.create(body);
  }
}
