// src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import getEmbeddings from "./getEmbeddings.js";
import fetchLittleData from "./fetchLittleData.js";
import fetchAllData from "./fetchAllData.js";
import convert from "./convertNumberToWords.js";
import saveToDb from "./saveToDb.js";
import search from "./search.js";
import fetchCarbyId from "./scrapeCarById.js";
import dotenv from "dotenv";
import semanticSearch from "./semanticSearch.js";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI!);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome, This is a simple use case of Semantic search");
});

app.get("/car-search-v2", (req: Request, res: Response) => {
  const searchQuery = req.query?.searchQuery as string;
  semanticSearch(searchQuery).then((data) => {
    let result: any[] = [];
    data.searchResults.forEach((item: any) => {
      let obj = {
        ...item,
        meta: item.meta.searchScore.toString(),
      };
      result.push(obj);
    });

    res.json({ searchResults: result });
  });
});

app.get("/car-search", (req: Request, res: Response) => {
  const searchQuery = req.query?.searchQuery as string;
  if (searchQuery) {
    search(searchQuery).then((data) => {
      let result: any[] = [];
      data.searchResults.forEach((item: any) => {
        let obj = {
          ...item,
          meta: item.meta.searchScore.toString(),
        };
        result.push(obj);
      });

      res.json({ searchResults: result });
    });
  }
});

app.get("/get-car-data", (req: Request, res: Response) => {
  const searchUrl = req.query?.searchUrl as string;
  if (searchUrl) {
    fetchCarbyId(searchUrl).then((data) => {
      res.json({ carData: data?.unifiedData });
    });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
