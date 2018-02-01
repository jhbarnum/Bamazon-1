--  Bamazon Node and MySQL App | Composed by John Kim | Univeristy of Richmond  --

CREATE DATABASE Bamazon;

USE Bamazon;

-- Create table containing store inventory --
CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

-- Seed data into the 'products' table --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Crazy Cat Lady Action Figure', 'Toys', '12.51', '31'),
    ('Dancing With Cats', 'Books', '14.79', '35'),
    ('Emergency Inflatable Chicken', 'Toys', '8.98', '88'),
    ('Water Balloon Roulette', 'Toys', '12.99', '99'),
    ('Cat Turntable', 'Pet supplies', '26.99', '55'),
    ('GloBowl Motion Activated Toilet Nightlight', 'Tools', '10.99', '169'),
    ('Quick Dude Shower Body Wipes', 'Personal care', '9.99', '4'),
    ('Combat Flip Flops', 'Travel gear', '21.99', '8'),
    ('Donald Trump Toilet Paper', 'Personal care', '5.99', '111'),
    ('Awkward Family Pet Photos', 'Books', '12.02', '47');