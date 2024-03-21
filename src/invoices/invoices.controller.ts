import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { Invoice } from './entities/invoice.entity';
import { InvoicesService } from './invoices.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(public readonly invoicesService: InvoicesService) {}

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
  async getAllInvoices(@Query(PaginationPipe) pagination?: PaginationPipe) {
    try {
      return await this.invoicesService.findAll(pagination);
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
  async findOne(@Param('invid') invid: number): Promise<Invoice> {
    try {
      return await this.invoicesService.findOne(invid);
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
    @Param('userId') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ): Promise<Invoice[]> {
    try {
      return await this.invoicesService.findInvoicesByUid(userId, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch invoices for user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
