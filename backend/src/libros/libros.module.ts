import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro } from './entities/libro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generos } from '../generos/entities/generos.entity';
import { GenerosService } from 'src/generos/generos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro, Generos]),
    GenerosService
  ],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
