import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { InvoicesService } from '../services/invoices.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../core/dto/Invoice.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('invoices')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Get()
  @ApiResponse({ status: 201, description: 'Success when searching the records' })
  findAll(
    @Query("offset") offset: number = 0,
    @Query("limit") limit: number = 10
  ) {
    return this.invoicesService.findAll(offset, limit);
  }

  @Get('/:id')
  @ApiResponse({ status: 201, description: 'Success when searching the register' })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Records were created successfully.' })
  @ApiBody({ description: 'List of invoices', type: [CreateInvoiceDto] })
  create(@Body() createInvoiceDto: CreateInvoiceDto[]): Promise<ResolveCreateInvoice> {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'The registry has been updated successfully.' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The record was successfully deleted.' })
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.invoicesService.remove(id);
  }
}
