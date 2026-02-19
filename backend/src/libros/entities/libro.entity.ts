//src/libros/entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'
import { Generos } from '../../generos/entities/generos.entity';

@Entity('libros')
export class Libro {
    @PrimaryGeneratedColumn()
    idlibro: number;

    @Column({length: 100})
    nombre: string;

    @Column({length: 100})
    autor: string

    @Column()
    descripcion: string

    @Column()
    fechapublicacion: Date

    @ManyToOne(() => Generos, (genero) => genero.idgenero)
    @JoinColumn({ name: 'idgenero' })
    generos: Generos;
}

