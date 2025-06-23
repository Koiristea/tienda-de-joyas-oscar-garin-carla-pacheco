/* 
DDL (Data Definition Language)
Las sentencias DDL se utilizan para definir o modificar la estructura de la base de datos. Esto incluye la creación, modificación y eliminación de objetos de la base de datos como:
  CREATE TABLE (crear una tabla)
  ALTER TABLE (modificar la estructura de una tabla)
  DROP TABLE (eliminar una tabla)
  CREATE INDEX (crear un índice)
  CREATE DATABASE (crear una base de datos)
*/

  CREATE DATABASE joyas;
  \c joyas;

  CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria
  VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);


