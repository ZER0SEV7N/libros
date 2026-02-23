//src/libros/libros.controller.ts
//CRUD de Libros
//Importaciones
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { FiltroDTO } from './dto/filtro.dto';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  //POST: crear libro
  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    console.log("Se ha creado un libro");
    return this.librosService.CrearLibros(createLibroDto);
  }

  //GET: filtrar libros por diferentes criterios
  @Get('filtrar')
  filtrar(@Query() filtroDto: FiltroDTO) {
    console.log("Se han aplicado los siguientes filtros: ", filtroDto);
    return this.librosService.filtrar(filtroDto);
  }

  //GET: encontrar todos los libros
  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  //GET: encontrar un libro por ID
  @Get(':idlibro')
  findOne(@Param('idlibro') idlibro: string) {
    console.log("Se ha encontrado el libro con ID:" + idlibro);
    return this.librosService.findOne(+idlibro);
  }

  //PATCH: Actualizar un libro por ID
  @Patch(':idlibro')
  update(@Param('idlibro') idlibro: string, @Body() updateLibroDto: UpdateLibroDto) {
    console.log("Se ha actualizado el libro con ID:" + idlibro);
    return this.librosService.update(+idlibro, updateLibroDto);
  }

  //DELETE: eliminar un libro por ID
  @Delete(':idlibro')
  remove(@Param('idlibro') idlibro: string) {
    console.log("Se ha eliminado el libro con ID:" + idlibro)
    return this.librosService.remove(+idlibro);
  }
}
