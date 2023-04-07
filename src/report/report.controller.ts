import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { User } from 'src/user/user.entitiy';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(parseInt(id), body.approved);
  }
}
