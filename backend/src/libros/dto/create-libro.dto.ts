//src/libros/dto/create-libro
import { IsNotEmpty, IsOptional, IsDateString, IsNumber } from "class-validator";
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
    @IsDateString()
    fechapublicacion: Date

    //idgenero
    @IsNumber()
    @IsNotEmpty()
    idgenero: number
}

