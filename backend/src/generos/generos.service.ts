//src/generos/generos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Generos } from './entities/generos.entity';

@Injectable()
export class GenerosService {
  //Repositorio de generos
  constructor(
    @InjectRepository(Generos)
    private generosRepo: Repository<Generos>,
  ) {}

  //Metodo para buscar todos los generos
  async findAll() {
    return await this.generosRepo.find();
  }

  //Metodo para buscar solamente un genero por su id
  async findOne(id: number) {
    return await this.generosRepo.findOne({ where: { idgenero: id } });
  }
}
