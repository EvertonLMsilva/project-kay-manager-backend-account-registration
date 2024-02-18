import { BadRequestException, Body, Injectable, Param } from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../core/dto/Invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/core/entities/invoice.entity';
import { Equal, Repository } from 'typeorm';
import { validarEAN13 } from 'src/core/utils/helpers';

@Injectable()
export class InvoicesService {

  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) { }

  async findAll(offset?: number, limit?: number) {
    const getAllUser = await this.invoiceRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { name: "ASC" }
    });

    return { count: getAllUser[1], rows: getAllUser[0] };
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Require params id!");

    return await this.invoiceRepository.findOneBy({ id });
  }

  async create(createInvoiceDto: CreateInvoiceDto[]): Promise<ResolveCreateInvoice> {
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

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const uuidVerify = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!uuidVerify.test(id)) throw new BadRequestException("Id invalid!");

    if (!updateInvoiceDto) throw new BadRequestException("Require data to update!");
    if (!id) throw new BadRequestException("Require params id!");

    const resolveData: ResolveUpdateInvoice = { error: [], update: [] };
    const { barcode, name, value } = updateInvoiceDto;

    const paramsVarify = !value ? "value" : !name ? "name" : !barcode ? "barcode" : "";
    if (paramsVarify) resolveData.error.push(`The invoice! Params (${paramsVarify}) void!`);

    const getInvoice = await this.invoiceRepository.find({
      where: [
        { id },
        { name },
        { barcode }
      ]
    });

    const findInvoiceId = getInvoice.find(valuesInvoice => valuesInvoice.id === id)
    if (!findInvoiceId) resolveData.error.push("Id not found!");

    const findName = getInvoice.find(valueInvoice => valueInvoice.name === name && valueInvoice.id != id);
    if (findName) resolveData.error.push("The invoice name already created!");

    const findBarcode = getInvoice.find(valueInvoice => valueInvoice.barcode === barcode && valueInvoice.id != id);
    if (findBarcode) resolveData.error.push("The invoice barcode already created!");

    const validateBarcode = validarEAN13(updateInvoiceDto.barcode);
    if (!validateBarcode.done) resolveData.error.push(validateBarcode.message)

    if (!resolveData.error.length) {
      await this.invoiceRepository.update(id, updateInvoiceDto)
        .then(async () => {
          const getInvoice = await this.invoiceRepository.findBy({ id });

          resolveData.update.push(getInvoice[0]);
        })
    } else {
      delete resolveData.update;
      throw new BadRequestException({ statusCode: 400, message: resolveData })
    }

    return resolveData;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Require params id!");

    const getInvoice = await this.invoiceRepository.findBy({ id });
    if (!getInvoice) throw new BadRequestException("Id not found!");

    await this.invoiceRepository.delete(id);
    return { message: "Success on deleted" };
  }
}
