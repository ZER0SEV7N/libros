//src/libros/dto/filtro.dto.ts
//DTO para filtrar libros por diferentes criterios
import { Type } from "class-transformer";
import { IsOptional, IsString, IsDateString, IsNumber } from "class-validator";

export class FiltroDTO {

    //Filtro por nombre
    @IsOptional()
    @IsString()
    nombre?: string;

    //Filtro por autor
    @IsOptional()
    @IsString()
    autor?: string;

    //Filtro por fecha de publicacion
    @IsOptional()
    @IsDateString()
    fechapublicacion?: string;

    //Filtro por genero
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    genero?: number;
}