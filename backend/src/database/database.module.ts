import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //Modulo para configurar la conexion a la base de datos
//PARA MYSQL NECESITAS NPM INSTALL MYSQL2

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //TIPO
      host: 'localhost', //RUTA
      port: 3306, //PUERTO
      username: 'root', //nombre
      password: '',
      database: 'libreria', //NOMBRE BASE DE DATOS
      autoLoadEntities: true, //CARGA AUTOMATICA DE ENTIDADES
      synchronize: false, //SINCRONIZACION
    }),
  ],
})
export class DatabaseModule {}
