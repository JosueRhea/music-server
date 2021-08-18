const { MongoClient } = require("mongodb");

let db;

MongoClient.connect(process.env.DATABASE_URL, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  console.log("dabase connected");
  db = client.db("tracksdb");
});

const getConnection = () => db;

module.exports = { getConnection };
