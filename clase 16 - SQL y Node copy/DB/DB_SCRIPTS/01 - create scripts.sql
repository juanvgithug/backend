/* Coderhouse eCommerce  */
CREATE DATABASE IF NOT EXISTS coderCommerce;

/* user */
DROP USER coder;
CREATE USER IF NOT EXISTS coder@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON coderCommerce.* TO 'coder'@'%'  WITH GRANT OPTION;
/* table */
DROP TABLE if exists coderCommerce.products;
CREATE TABLE IF NOT EXISTS coderCommerce.products(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(128),
price DOUBLE,
thumbnail VARCHAR(2048) NOT NULL, 
PRIMARY KEY ( id )
);

/* data */
INSERT INTO coderCommerce.products VALUES ('', 'Escuadra','123.45','https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png');
INSERT INTO coderCommerce.products VALUES ('', 'Calculadora','234.56','https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png');
INSERT INTO coderCommerce.products VALUES ('', 'Globo Terráqueo','345.67','https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png');
INSERT INTO coderCommerce.products VALUES ('', 'iPhone 13 Pro Max','1590','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346288');









