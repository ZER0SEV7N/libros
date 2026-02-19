import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    console.log("Se ha creado un libro")
    return this.librosService.CrearLibros(createLibroDto);
  }

  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @Get(':idlibro')
  findOne(@Param('idlibro') idlibro: string) {
    return this.librosService.findOne(+idlibro);
  }

  @Patch(':idlibro')
  update(@Param('idlibro') idlibro: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(+idlibro, updateLibroDto);
  }

  @Delete(':idlibro')
  remove(@Param('idlibro') idlibro: string) {
    console.log("Se ha eliminado el libro con ID:" + idlibro)
    return this.librosService.remove(+idlibro);
  }
}
