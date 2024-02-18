import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { InvoicesService } from '../services/invoices.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../core/dto/Invoice.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Get()
  findAll(
    @Query("offset") offset: string,
    @Query("limit") limit: string
  ) {
    return this.invoicesService.findAll(+offset, +limit);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ description: 'List of invoices', type: [CreateInvoiceDto] })
  create(@Body() createInvoiceDto: CreateInvoiceDto[]): Promise<ResolveCreateInvoice> {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
