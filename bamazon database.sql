DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db; 

CREATE TABLE products (
		id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(100) NOT NULL,
        department_name VARCHAR(40) NOT NULL,
        price DECIMAL(10,3) NULL,
        stock_quanity INT NULL,
        PRIMARY KEY (id)
);

UPDATE products
SET product_name = "Golden State Warriors Sweater", department_name = "Clothing", price = 49.99, stock_quanity = 20
WHERE id = 9;



INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Beats Studio3 Headphones", "Electronics", 324.95, 100);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Samsung Ultra HD TV", "Home Appliances", 427.99, 90);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Easton Baseball Bat", "Sporting Goods", 59.99, 80);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Black & Decker Toaster Oven", "Kitchen", 49.99, 70);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Leather Sectional Sofa", "Furniture", 239.99, 60);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Premium 8 piece Towel Set", "Bath", 25.99, 50);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Colore Acrylic Paint Set", "Arts & Craft", 14.99, 40);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Oscar Myers Bacon", "Food", 6.99, 30);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Jaguar F-Type", "Automobile", 59.900, 20);

INSERT INTO products ( product_name, department_name, price, stock_quanity)
VALUES ("Air Jordan XI Retro ", "Electronics", 170.99, 10);





