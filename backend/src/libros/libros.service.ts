import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

//Creacion de la clase
@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    //Repositorio de libros
    private libroRepo: Repository<Libro>,
  ) {}

  //Metodo Crear
  async CrearLibros(createLibroDto: CreateLibroDto): Promise<Libro> {
    
    const newlibro = this.libroRepo.create(createLibroDto);
    return await this.libroRepo.save(newlibro);
  }

  //Metodo para encontrar
  async findAll() {
    return await this.libroRepo.find();
  }

  //Metodo para encontrar uno
  async findOne(idlibro: number) {
    const libro = this.libroRepo.findOne({ where: { idlibro } });
    if (!libro) {
      throw await new NotFoundException(
        'El libro que usted esta buscando no existe',
      );
    }
  }

  async update(idlibro: number, updateLibroDto: UpdateLibroDto) {
    const libro = this.libroRepo.findOne({ where: { idlibro } });
    if (!libro) {
      throw new NotFoundException('El libro que usted esta buscando no existe');
    }
    return await this.libroRepo.save(updateLibroDto);
  }

  async remove(idlibro: number) {
    const libro = this.libroRepo.findOne({ where: { idlibro } });
    if(!libro){
      throw new NotFoundException('El libro que busca no existe')
    }
    return await this.libroRepo.delete(idlibro);
    }
}
