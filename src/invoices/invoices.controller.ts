import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  OnModuleInit,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';
import { PaginationPipe } from '../common/pipes/pagination.pipe';

@ApiTags('')
@Controller('')
export class InvoicesController implements OnModuleInit {
  public invoicesService: InvoicesService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.invoicesService = this.moduleRef.get(InvoicesService, {
      strict: false,
    });
  }

  @Get('/')
  @ApiOperation({ summary: 'Retrieve a paginated list of invoices' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of invoices',
    type: [Invoice],
  })
  async getAllInvoices(
    @Req() req: Request,
    @Query(PaginationPipe) pagination?: PaginationPipe,
  ) {
    try {
      const schema = req.user?.schema;
      return await this.invoicesService.findAll(schema, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch invoices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':invid')
  @ApiOperation({ summary: 'Fetch a single invoice by its ID' })
  @ApiParam({
    name: 'invid',
    type: 'number',
    description: 'The ID of the invoice',
  })
  @ApiResponse({
    status: 200,
    description: 'The requested invoice',
    type: Invoice,
  })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async findOne(
    @Req() req: Request,
    @Param('invid') invid: number,
  ): Promise<Invoice> {
    try {
      const schema = req.user?.schema;
      return await this.invoicesService.findOne(schema, invid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch invoice by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Fetch invoices associated with a specific user' })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'The ID of the user',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of invoices for the user',
    type: [Invoice],
  })
  async findInvoicesByUid(
    @Req() req: Request,
    @Param('userId') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ): Promise<Invoice[]> {
    try {
      const schema = req.user?.schema;
      return await this.invoicesService.findInvoicesByUid(
        schema,
        userId,
        pagination,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch invoices for user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
