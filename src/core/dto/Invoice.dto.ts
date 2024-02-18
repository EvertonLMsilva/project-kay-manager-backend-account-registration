import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateInvoiceDto {
    @ApiProperty({
        description: 'Register a name for the invoice',
    })
    name: string;

    @ApiProperty({
        description: 'Register a barcode for the invoice',
        minimum: 13,
    })
    barcode: string;

    @ApiProperty({
        description: 'Register an invoice value',
        minimum: 1,
    })
    value: number;
}

export class FindOneInvoiceDto {
    @ApiProperty({
        description: 'Find invoice by id',
    })
    id: string;

    @ApiProperty({
        description: 'Find invoice by barcode',
        minimum: 13,
    })
    barcode: string;
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) { }
