-- Select everything in both tables; even if owner_id or id is missing, the row will still show up
SELECT * FROM owners FULL JOIN vehicles ON vehicles.owner_id = owners.id;

-- Count the number of cars for each owner
-- first, list desired columns, then after the FROM put the join
SELECT first_name, last_name, COUNT(owner_id) 
    FROM owners JOIN vehicles
    ON vehicles.owner_id = owners.id -- join on the matching owner ids
    GROUP BY first_name, last_name -- both are non-aggregate, so they must be in the GROUP BY
    ORDER BY first_name; -- alphabetize

-- Count the number of cars for each owner and display avg price of cars as int
-- Display owner first and last name, average price, and vehicle count
-- first name in descending order
-- Only show average price > 10000
SELECT first_name, last_name, CAST(AVG(price) AS INTEGER) as average_price, COUNT(*)
    FROM owners JOIN vehicles
    ON owners.id = vehicles.owner_id
    GROUP BY (first_name, last_name)
    HAVING CAST(AVG(price) AS INTEGER) > 10000
    ORDER BY first_name DESC;
