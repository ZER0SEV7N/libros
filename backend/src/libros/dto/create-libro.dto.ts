//src/libros/dto/create-libro
import { IsNotEmpty, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";
export class CreateLibroDto {

    //Nombre
    @IsNotEmpty()
    nombre: string

    //autor
    @IsNotEmpty()
    autor: string

    @IsOptional()
    descripcion: string

    //fechaPublicacion
    @Type(() => Date)
    @IsDate()
    fechapublicacion: Date

    //idgenero
    @Type(() => Number)
    @IsNotEmpty()
    idgenero: number
}

