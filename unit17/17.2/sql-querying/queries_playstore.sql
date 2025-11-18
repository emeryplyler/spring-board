-- Comments in SQL Start with dash-dash --

-- 1: find the app with ID 1880
SELECT * FROM analytics WHERE id = 1880;

-- 2: find ID and name for all apps last updated on aug 1, 2018
SELECT id, app_name FROM analytics WHERE last_updated='2018-08-01';

-- 3: Count the number of apps in each category, e.g. “Family | 1972”
SELECT category, COUNT(*) FROM analytics
GROUP BY category;

-- 4: find top 5 most-reviewed apps, show number of reviews
SELECT app_name, reviews FROM analytics
ORDER BY reviews DESC
LIMIT 5;

-- 5: find app with most reviews with a rating >= 4.8
SELECT app_name, rating, reviews FROM analytics
WHERE rating >= 4.8
ORDER BY reviews DESC
LIMIT 1;

-- 6: find average rating for each category, highest to lowest
SELECT category, AVG(rating) FROM analytics
GROUP BY category
ORDER BY AVG(rating) DESC;
-- Can also be:
-- ORDER BY avg DESC;

-- 7: find name, price, rating of most expensive app with rating < 3
SELECT app_name, price, rating FROM analytics
WHERE rating < 3
ORDER BY price DESC
LIMIT 1;

-- 8: find all apps with a min install <= 50 with a rating; highest rated first
SELECT app_name, min_installs, rating FROM analytics
WHERE min_installs <= 50 AND rating IS NOT NULL
ORDER BY rating DESC;

-- 9: find names of all apps with rating < 3 with >=10 000 reviews
SELECT app_name FROM analytics
WHERE rating < 3 AND reviews >= 10000;

-- 10: find the top 10 most-reviewed apps with price between 0.10 and 1.00
SELECT app_name, reviews, price FROM analytics
WHERE price BETWEEN 0.1 AND 1
ORDER BY reviews DESC
LIMIT 10;

-- 11: find the most out-of-date app
SELECT app_name, last_updated FROM analytics
ORDER BY last_updated
LIMIT 1;
-- Subquery version:
SELECT app_name, last_updated FROM analytics
WHERE last_updated = (SELECT MIN(last_updated) FROM analytics);

-- 12: find the most expensive app
SELECT app_name, price FROM analytics
ORDER BY price DESC
LIMIT 1;

-- 13: count all reviews
SELECT SUM(reviews) FROM analytics;
-- Can label the sum:
-- SELECT SUM(reviews) AS "Total Reviews" FROM analytics;

-- 14: find all categories with more than 300 apps
SELECT category, COUNT(*) FROM analytics
GROUP BY category
HAVING COUNT(*) > 300;

-- 15: find app with highest ratio of min_install/reviews; only apps with 100 000 installs
-- show name, num reviews, min installs, and ratio
SELECT app_name, reviews, min_installs, min_installs/reviews FROM analytics
WHERE min_installs >= 100000
ORDER BY min_installs/reviews DESC
LIMIT 1;
