-- Comments in SQL Start with dash-dash --

-- 1: add a product: 'chair', 44.00, cant be returned
INSERT INTO products (name, price, can_be_returned) VALUES
('chair', 44.00, false),

-- 2: add stool, 25.99, true
('stool', 25.99, true),

-- 3: add table, 124.00, false
('table', 124.00, false);

-- 4: display all rows and columns
SELECT * FROM products;

-- 5: display all product names
SELECT name FROM products;

-- 6: display all names and prices
SELECT name, price FROM products;

-- 7: add a new product
INSERT INTO products (name, price, can_be_returned) VALUES
('double chair', 89, false);

-- 8: display only products that can be returned
SELECT * FROM products 
WHERE can_be_returned = true;
-- Can also be written as:
-- WHERE can_be_returned;

-- 9: display only products under $44
SELECT * FROM products 
WHERE price < 44.00;

-- 10: display only products from $22.50 to $99.99
SELECT * FROM products 
WHERE price BETWEEN 22.50 AND 99.99;

-- 11: everything is $20 off
UPDATE products
SET price = price - 20;

-- 12: everything less than $25 has sold out
DELETE from products
WHERE price < 25;

-- 13: the sale is over, raise prices by $20
UPDATE products
SET price = price + 20;

-- 14: everything is returnable
UPDATE products
SET can_be_returned = true;
