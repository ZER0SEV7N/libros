//src/libros/entity
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('libros')
export class Libro {
    @PrimaryGeneratedColumn()
    idlibro: number;

    @Column()
    nombre: string;

    @Column()
    autor: string

    @Column()
    genero: string

    @Column()
    descripcion: string

    @Column()
    fechapublicacion: Date

}

