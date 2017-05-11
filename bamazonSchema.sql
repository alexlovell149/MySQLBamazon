CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bleach", "Cleaning",3.99,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cookies", "Snacks",2.49,38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Bone", "Pet",1.00,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Ribs", "Butcher",18.79,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blueberries", "Produce",3.20,15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Corn", "Produce",0.79,33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Italian Sausage", "Butcher",5.78, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Garlic Press", "Cooking",7.99,17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pralines", "Snacks",6.00,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guacamole", "Ethnic",2.50,35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Feta Cheese", "Deli",2.69,40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Honey-baked Ham", "Deli",2.00,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Arugula", "Produce", 5.00 ,50);

SELECT * FROM products;