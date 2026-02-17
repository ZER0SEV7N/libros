import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRoot ({
        type: 'mysql', //TIPO
        host: 'localhost', //RUTA
        port: 3306, //PUERTO
        username: 'root', //nombre
        password: '',
        database: 'libreria', //NOMBRE BASE DE DATOS
        autoLoadEntities: true,
        synchronize: false,
        })
    ]
})
export class DatabaseModule {}
