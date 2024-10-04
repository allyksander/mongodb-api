import "dotenv/config";
import { MongoClient } from "mongodb";

let dbConnection;

export const connetToDb = (cb) => {
  MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      console.log("Connected to MongoDB");

      dbConnection = client.db();

      return cb();
    })
    .catch((error) => cb(error));
};

export const getDb = () => dbConnection;
