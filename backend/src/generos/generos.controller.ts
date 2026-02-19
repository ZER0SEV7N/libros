//src/generos/generos.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GenerosService } from './generos.service';


@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Get()
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generosService.findOne(+id);
  }

}
