import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DetailService } from './detail.service';
import { GetDetailResponse } from './response/detail.response';
@Controller('details')
@ApiTags('Detail')
export class DetailController {
  constructor(private readonly detailsService: DetailService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Detail',
  })
  @ApiOkResponse({
    type: GetDetailResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.detailsService.listAll(id);
  }
}
