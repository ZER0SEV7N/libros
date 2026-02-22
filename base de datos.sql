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
    SELECT  COUNT(idlibro) AS "Total de Libros" FROM LIBROS;
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
    SELECT  p_idlibro AS "Actualizacion: Libro ID: " ;
END//
DELIMITER ;

-- Crear un Procedimiento almacenado para Filtrar libros por multiples criterios
DELIMITER //
CREATE PROCEDURE SP_FILTRAR_LIBROS (
    IN p_nombre VARCHAR(100),
    IN p_autor VARCHAR(100),
    IN p_idgenero INT,
    IN p_fechapublicacion DATE
)
BEGIN
    SELECT * FROM LIBROS
    WHERE (p_nombre IS NULL OR nombre LIKE CONCAT('%', p_nombre, '%'))
    AND (p_autor IS NULL OR autor LIKE CONCAT('%', p_autor, '%'))
    AND (p_idgenero IS NULL OR idgenero = p_idgenero)
    AND (p_fechapublicacion IS NULL OR fechapublicacion = p_fechapublicacion);
END//
DELIMITER ;