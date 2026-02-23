import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {

    //idgenero
    @IsOptional()
    @IsNumber()
    idgenero?: number;
}
