import "dotenv/config";
import express from "express";
import { Db } from "mongodb";
import { connetToDb, getDb } from "./src/db";

const PORT = process.env.PORT || "3000";
const app = express();
let db: Db;

connetToDb((error: Error) => {
  if (!error) {
    app.listen(PORT, () =>
      error ? console.log(error) : console.log(`Listen port ${PORT}`)
    );
    db = getDb();
  } else {
    console.log(`DB connection error: ${error}`);
  }
});
