import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { GenerosService } from '../generos/generos.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { FiltroDTO } from './dto/filtro.dto';

//Creacion de la clase
@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    //Repositorio de libros
    private libroRepo: Repository<Libro>,
    private Generoservice: GenerosService,
  ) {}

  //Metodo Crear
  async CrearLibros(createLibroDto: CreateLibroDto) {
    //Encontrar el genero del libro (idLibro)
    const genero = await this.Generoservice.findOne(createLibroDto.idgenero);
    if (!genero) {
      throw new NotFoundException(
        'El genero que usted esta buscando no existe',
      );
    }
    //Crear el nuevo libro llamando al procedimiento almacenado
    const query = `CALL SP_INSERTAR_LIBRO(?,?,?,?,?)`;
    //Enviar los parametros al procedimiento almacenado
    const newlibro = await this.libroRepo.query(query, [
      createLibroDto.nombre,
      createLibroDto.autor,
      createLibroDto.descripcion,
      createLibroDto.fechapublicacion,
      genero.idgenero,
    ]);
    return newlibro[0][0];
  }

  //Metodo para encontrar todos los libros
  async findAll() {
    return await this.libroRepo.find({ relations: ['generos'] });
  }

  //Metodo para encontrar uno por ID
  async findOne(idlibro: number) {
    const libro = await this.libroRepo.findOne({ where: { idlibro }, relations: ['generos'] });
    if (!libro) {
      throw new NotFoundException('El libro que usted esta buscando no existe');
    }
    return await libro;
  }

  //Metodo para Filtrar los libros por diferentes criterios
  async filtrar(filtroDto: FiltroDTO) {
    //Llamar al procedimiento
    const libro = await this.libroRepo.query(
      `CALL SP_FILTRAR_LIBROS(?,?,?,?)`,
      [
        filtroDto.nombre ?? null,
        filtroDto.autor ?? null,
        filtroDto.genero ?? null,
        filtroDto.fechapublicacion ?? null,
        
      ],
    );

    return libro[0];
  }

  //Metodo para actualizar un libro por su ID
  async update(idlibro: number, updateLibroDto: UpdateLibroDto) {
    //ubicar el libro por su ID
    const libro = await this.libroRepo.findOne({
      where: { idlibro },
      relations: ['generos'],
    });
    if (!libro) {
      throw new NotFoundException('El libro que usted esta buscando no existe');
    }

    //Llamar al procedimiento almacenado
    const query = this.libroRepo.query(
      `CALL SP_ACTUALIZAR_LIBRO(?,?,?,?,?,?)`,
      [
        idlibro,
        updateLibroDto.nombre || libro.nombre,
        updateLibroDto.autor || libro.autor,
        updateLibroDto.descripcion || libro.descripcion,
        updateLibroDto.fechapublicacion || libro.fechapublicacion,
        updateLibroDto.idgenero ?? libro.generos.idgenero,
      ],
    );
    return await query;
  }

  //Metodo para eliminar un libro por su ID
  async remove(idlibro: number) {
    const libro = await this.libroRepo.findOne({ where: { idlibro } }); //Ubicar libro
    if (!libro) {
      throw new NotFoundException('El libro que busca no existe');
    }
    return await this.libroRepo.delete(idlibro);
  }
}
