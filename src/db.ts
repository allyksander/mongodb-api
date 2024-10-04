import "dotenv/config";
import { type Db, MongoClient } from "mongodb";

let dbConnection: Db;

export const connetToDb: Function = (cb: Function) => {
  MongoClient.connect(process.env.DB_URL || "")
    .then((client) => {
      console.log("Connected to MongoDB");

      dbConnection = client.db();

      return cb();
    })
    .catch((error) => cb(error));
};

export const getDb: Function = () => dbConnection;
