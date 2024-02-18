import { BadRequestException, Body, Injectable, Param } from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../core/dto/Invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/core/entities/invoice.entity';
import { Repository } from 'typeorm';
import { validarEAN13 } from 'src/core/utils/helpers';

@Injectable()
export class InvoicesService {

  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) { }

  async findAll(offset: number, limit: number) {
    const getAllUser = await this.invoiceRepository.findAndCount({
      skip: offset || 0,
      take: limit || 10,
      order: { name: "ASC" }
    });

    return { count: getAllUser[1], rows: getAllUser[0] };
  }

  async findOne(id: string) {
    const getAllUser = await this.invoiceRepository.findOneBy({ id });

    return getAllUser
  }

  async create(@Body() createInvoiceDto: CreateInvoiceDto[]): Promise<ResolveCreateInvoice> {
    if (createInvoiceDto.length === 0) throw new BadRequestException("Invalid data!");

    const resolveData: ResolveCreateInvoice = {
      invalidCode: [],
      already: [],
      created: [],
    }

    for (let index = 0; index < createInvoiceDto.length; index++) {
      const { barcode, name, value } = createInvoiceDto[index]
      const messageToError = [];

      const validateBarcode = validarEAN13(barcode);
      if (!validateBarcode.done) messageToError.push(validateBarcode.message);

      const paramsVarify = !value ? "value" : !name ? "name" : !barcode ? "barcode" : "";
      if (paramsVarify) messageToError.push(`The invoice! Params (${paramsVarify}) void!`);

      const getInvoiceName = await this.invoiceRepository.findOneBy({ name: name });
      if (getInvoiceName && !paramsVarify && validateBarcode.done) messageToError.push("The invoice name already created!");

      const getInvoiceBarcode = await this.invoiceRepository.findOneBy({ barcode: barcode });
      if (getInvoiceBarcode && !paramsVarify && validateBarcode.done) messageToError.push(`Barcode already registered!`);

      if (messageToError?.length) {
        resolveData[paramsVarify || !validateBarcode.done ? "invalidCode" : "already"].push({
          name,
          barcode,
          value,
          description: messageToError
        });
      } else {
        const createInvoice = await this.invoiceRepository.save({ barcode: barcode, name: name, value });

        resolveData?.created.push(createInvoice);
      }
    }

    return resolveData;
  }

  async update(
    @Param() id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  async remove(id: string) {
    return `This action removes a #${id} invoice`;
  }
}
