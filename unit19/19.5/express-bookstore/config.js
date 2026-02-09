/** Common config for bookstore. */


let DB_URI = `postgresql://postgres:postgres@localhost`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/emery`;
}


module.exports = { DB_URI };