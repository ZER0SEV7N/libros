//src/generos/generos.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GenerosService } from './generos.service';

@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  //GET: encontrar todos los generos
  @Get()
  findAll() {
    return this.generosService.findAll();
  }

  //GET: encontrar un genero por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generosService.findOne(+id);
  }

}
