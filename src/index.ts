// src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import generateUnifiedData from "./generateUnifiedData.js";
import fetchLittleData from "./fetchLittleData.js";
import fetchAllData from "./fetchAllData.js";
import convert from "./convertNumberToWords.js";
import saveToDb from "./saveToDb.js";
import search from "./search.js";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI!);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome, This is a simple use case of Semantic search");
});

app.get("/car-search", (req: Request, res: Response) => {
  const searchQuery = req.query?.searchQuery as string;
  if (searchQuery) {
    search(searchQuery).then((data) => {
      res.json(data);
    });
  }
});

// app.get("/upload", (req: Request, res: Response) => {
//   fetchAllData();
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
