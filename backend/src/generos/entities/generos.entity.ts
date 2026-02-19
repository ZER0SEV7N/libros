import { PrimaryGeneratedColumn, Entity, Column, OneToMany  } from "typeorm";
import { Libro } from "../../libros/entities/libro.entity";

@Entity('generos')
export class Generos {

    //ID de genero
    @PrimaryGeneratedColumn()
    idgenero: number;

    //Nombre del genero
    @Column({length: 100})
    nombre: string;

    @OneToMany(() => Libro, (libro) => libro.generos)
    libros: Libro[];

}