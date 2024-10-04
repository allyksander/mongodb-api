import "dotenv/config";
import express from "express";
import { connetToDb, getDb } from "./db.js";

const PORT = process.env.PORT;
const app = express();
let db;

connetToDb((error) => {
  if (!error) {
    app.listen(PORT, (error) =>
      error ? console.log(error) : console.log(`Listen port ${PORT}`)
    );
    db = getDb();
  } else {
    console.log(`DB connection error: ${error}`);
  }
});
