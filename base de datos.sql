-- Base de datos para la librería
DROP DATABASE IF EXISTS LIBRERIA;
CREATE DATABASE IF NOT EXISTS LIBRERIA;

USE LIBRERIA

-- CREAR GENEROS DE LIBROS
CREATE TABLE GENEROS (
    idgenero int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- CREAR LIBROS
CREATE TABLE LIBROS (
    idlibro int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fechapublicacion DATE NOT NULL,
    idgenero int,    
    FOREIGN KEY (idgenero) REFERENCES GENEROS(idgenero)
);

-- Insertar GENEROS
INSERT GENEROS (idgenero, nombre) VALUES 
    (null, 'Fantasia'), 
    (null, 'Ciencia Ficción'), 
    (null, 'Terror'), 
    (null, 'Romance'), 
    (null, 'Historia'),
    (null, 'Filosofia'),
    (null, 'Post-apocaliptico');

-- Crear un procedimiento almacenado para insertar un libro
DELIMITER //
CREATE PROCEDURE SP_INSERTAR_LIBRO (
    IN p_nombre VARCHAR(100),
    IN p_autor VARCHAR(100),
    IN p_descripcion VARCHAR(255),
    IN p_fechapublicacion DATE,
    IN p_idgenero INT
)
BEGIN
    INSERT LIBROS (nombre, autor, descripcion, fechapublicacion, idgenero) 
    VALUES (p_nombre, p_autor, p_descripcion, p_fechapublicacion, p_idgenero);
    SELECT CONCAT('Libros en total: ', COUNT(idlibro) )AS "total" FROM LIBROS;
END //
DELIMITER ;

-- LLamar al procedimiento almacenado para insertar un libro nuevo
CALL SP_INSERTAR_LIBRO('El Señor de los anillos', 'J.R.R. Tolkien', 'Un grupo de heroes se embarcan en una mision para destruir el anillo unico', '1954-07-29', 1);

-- Crear un procedimiento almacenado para actualizar un libro
DELIMITER //
CREATE PROCEDURE SP_ACTUALIZAR_LIBRO (
    IN p_idlibro INT,
    IN p_nombre VARCHAR(100),
    IN p_autor VARCHAR(100),
    IN p_descripcion VARCHAR(255),
    IN p_fechapublicacion DATE,
    IN p_idgenero INT
)
BEGIN
    UPDATE LIBROS
    SET nombre = p_nombre, autor = p_autor, descripcion = p_descripcion, fechapublicacion = p_fechapublicacion, idgenero = p_idgenero
    WHERE idlibro = p_idlibro;
    SELECT CONCAT('Se ha actualizado el libro con ID: ', p_idlibro) AS "Actualizacion";
END//
DELIMITER ;