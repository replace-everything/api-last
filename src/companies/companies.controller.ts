import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  UseGuards,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CompanyService } from './companies.service';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('')
@Controller('')
export class CompanyController implements OnModuleInit {
  private companyService: CompanyService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.companyService = this.moduleRef.get(CompanyService, { strict: false });
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all companies' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset the results',
  })
  findAll(@Req() req, @Query(PaginationPipe) pagination: PaginationPipe) {
    const schema = req.user?.schema;
    const { limit, offset } = pagination;
    return this.companyService.findAll(schema, { limit, offset });
  }

  @Get('/:coid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a company by coid' })
  @ApiParam({ name: 'coid', description: 'Company ID' })
  findOneByCoid(@Param('coid') coid, @Req() req) {
    const schema = req.user?.schema;
    return this.companyService.findOneByCoid(schema, coid);
  }

  @Get('/coname/:coname')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find companies by coname' })
  @ApiParam({ name: 'coname', description: 'Company name' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset the results',
  })
  findOneByConame(
    @Param('coname') coname,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ) {
    const schema = req.user?.schema;
    const { limit, offset } = pagination;
    return this.companyService.findOneByConame(
      schema,
      { limit, offset },
      coname,
    );
  }
}
