import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator/types/decorator/decorators';

export class CreateProductDto {

    @ApiProperty()
    @IsString()

    name: string;

    @ApiProperty()
    @IsNumber()
    price:number


    @ApiProperty()
    @IsNumber()
    quantity:number

}
