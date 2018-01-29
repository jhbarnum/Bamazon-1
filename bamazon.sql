--  Bamazon Node and MySQL App | Composed by John Kim | Univeristy of Richmond  --

CREATE DATABASE Bamazon;

USE Bamazon;

-- Create table containing store inventory --
CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

-- Seed data into the 'products' table --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Crazy Cat Lady Action Figure', 'toys', '12.51' ,'31'),
    ('Dancing With Cats', 'books', '14.79', '35'),
    ('Emergency Inflatable Chicken', 'toys', '8.98', '8'),
    ('Water Balloon Roulette', 'toys', '12.99', '9'),
    ('Cat Turntable', 'pet supplies', '26.99', '5'),
    ('GloBowl Motion Activated Toilet Nightlight', 'Tools', '10.99', '16'),
    ('Quick Dude Shower Body Wipes', 'personal care', '9.99', '4'),
    ('Combat Flip Flops', 'travel gear', '21.99', '8'),
    ('Donald Trump Toilet Paper', 'personal care', '5.99', '1'),
    ('Awkward Family Pet Photos', 'books', '12.02', '47');