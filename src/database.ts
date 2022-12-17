import { MongoClient } from "mongodb";

let client: MongoClient;
if (process.env.DATABASE_URL) {
  client = new MongoClient(process.env.DATABASE_URL);
} else {
  console.log("Databse url not found");
}

export { client };
