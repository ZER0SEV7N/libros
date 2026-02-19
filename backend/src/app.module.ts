import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LibrosModule } from './libros/libros.module';
import { GenerosModule } from './generos/generos.module';

@Module({
  imports: [DatabaseModule, LibrosModule, GenerosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
