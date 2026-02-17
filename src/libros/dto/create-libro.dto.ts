//src/libros/dto/create-libro
import { IsNotEmpty, IsDate } from "class-validator";
export class CreateLibroDto {

    //Nombre
    @IsNotEmpty()
    nombre: string

    //autor
    @IsNotEmpty()
    autor: string

    //genero
    @IsNotEmpty()
    genero: string

    //fechaPublicacion
    @IsDate()
    fechaPublicacion: Date
}

