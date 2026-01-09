const { ObjectId } = require("mongodb");
const connect = require("./db");


const runDatabaseQueries = async () => {

  const db = await connect();
  const movies = db.collection('movies');

  // Create
  // 1.
  const users = db.collection("users");
  const newUser = {
    name: "Newbie",
    email: "n@n.com",
    password: "dkfjdkfjkdjfdf"
  }

  const result = await users.insertOne(newUser);
  console.log(result);

  // Read
  // 1.
  // create a cursor, then wait for each item in the cursor to be retrieved
  const nolan = movies.find({ directors: ["Christopher Nolan"] }).project({ title: 1, directors: 1 });
  for await (const doc of nolan) {
    console.log(doc);
  }

  // 2.
  const actionByYear = movies.find({ genres: "Action" }).project({ title: 1, year: 1, genres: 1 }).sort({ year: -1 });
  for await (const doc of actionByYear) {
    console.log(doc);
  }

  // 3.
  const over8 = movies.find({ "imdb.rating": { $gt: 8.0 } }).project({ title: 1, imdb: 1 });
  for await (const doc of over8) {
    console.log(doc);
  }

  // 4.
  const hanksAllen = movies.find({ $and: [{ cast: "Tim Allen" }, { cast: "Tom Hanks" }] }).project({ title: 1, cast: 1 });
  for await (const doc of hanksAllen) {
    console.log(doc);
  }

  // 5.
  const onlyHanksAllen = movies.find({ cast: ["Tom Hanks", "Tim Allen"] }).project({ title: 1, cast: 1 });
  for await (const doc of onlyHanksAllen) {
    console.log(doc);
  }

  // 6.
  // Note: I interpreted "movies directed by Steven Spielberg" to mean "movies where Spielberg is one of the directors".
  // For question 1, I picked "movies where Christopher Nolan is the ONLY director".
  const spielberg = movies.find({ directors: "Steven Spielberg" }).project({ title: 1, directors: 1 });
  for await (const doc of spielberg) {
    console.log(doc);
  }


  // Update
  // 1.
  const matrixSflix = await movies.updateOne({ title: "The Matrix" }, { $set: { available_on: "Sflix" } });
  console.log(matrixSflix);

  // 2.
  const matrixMeta = await movies.updateOne({ title: "The Matrix" }, { $inc: { metacritic: 1 } });
  console.log(matrixMeta);

  // 3.
  const genZ = await movies.updateMany({ year: 1997 }, { $addToSet: { genres: "Gen Z" } });
  console.log(genZ);

  // 4.
  const under5 = await movies.updateMany({ "imdb.rating": { $lt: 5 } }, { $inc: { "imdb.rating": 1 } });
  console.log(under5);


  // Delete
  // 1.
  const comments = db.collection("comments");
  const specificComment = await comments.deleteOne({ _id: new ObjectId("5a9427648b0beebeb69579e7") });
  console.log(specificComment);

  // 2.
  // find ID of The Matrix, then delete comments
  const matrixMovie = await movies.findOne({ title: "The Matrix" });
  const matrixID = matrixMovie._id;

  const matrixComments = await comments.deleteMany({ movie_id: matrixID });
  console.log(matrixComments);

  // 3.
  const noGenres = await movies.deleteMany({ genres: { $size: 0 } });
  console.log(noGenres);


  // Aggregate
  // 1.
  const yearsPipeline = []; // instructions/aggregation stages will go in here, in order
  yearsPipeline.push({ $group: { _id: "$year", movies_this_year: { $sum: 1 } } });
  // the _id here is the required field that the movies will be grouped by
  // which for some reason needs to be a string and needs the $ in front
  // another field is added to show the sum of each group; it's being named 'movies_this_year'
  yearsPipeline.push({ $sort: { _id: 1 } });
  // this sorts them by the year, not the ObjectId, because _id in the aggregate pipeline means "$year"

  const yearsAggResult = movies.aggregate(yearsPipeline);

  for await (const doc of yearsAggResult) {
    console.log(doc);
  }

  // 2.
  const directorPipeline = [];
  directorPipeline.push({
    $unwind: {
      path: "$directors"
    }
  });

  directorPipeline.push({
    $group: {
      _id: "$directors",
      average_rating: {
        $avg: "$imdb.rating"
      }
    }
  });

  directorPipeline.push({ $sort: { average_rating: 1 } });

  const directorsAggResult = movies.aggregate(directorPipeline);

  for await (const doc of directorsAggResult) {
    console.log(doc);
  }


  // End
  process.exit(0);
};


runDatabaseQueries();