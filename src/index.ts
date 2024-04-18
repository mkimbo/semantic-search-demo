// src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import getEmbeddings from "./getEmbeddings.js";
import fetchLittleData from "./fetchLittleData.js";
import fetchAllData from "./fetchAllData.js";
import convert from "./convertNumberToWords.js";
import saveToDb from "./saveToDb.js";
import scrapePage from "./scrapeAPage.js";
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
  res.json({ success: true });
  // scrapePage("https://www.constituteproject.org/constitution/Kenya_2010").then(
  //   (response) => {
  //     console.log("done");
  //     res.json({ scrapeResults: response });
  //   }
  // );
  // fetchAllData().then((response) => {
  //   console.log("done");
  //   res.json({ success: true });
  // });
  //res.send("Welcome, This is a simple use case of Semantic search");
});

app.get("/car-search-v2", (req: Request, res: Response) => {
  const searchQuery = req.query?.searchQuery as string;
  function extractFileName(url: string) {
    // Split the URL by "/"
    const parts = url.split("/");
    // Get the last part of the URL which contains the filename
    const fileName = parts[parts.length - 1];
    return fileName;
  }
  semanticSearch(searchQuery).then((data) => {
    let result: any[] = [];
    let docs = data.searchResults.sort(
      (a, b) =>
        parseInt(a.meta.searchScore.toString()) -
        parseInt(b.meta.searchScore.toString())
    );
    docs.forEach((item: any) => {
      let obj = {
        id: item.url,
        nm: item.yr + " " + item.nm,
        pr: item.pr,
        sp: item.dt,
        img: extractFileName(item.img),
      };
      result.push(obj);
    });

    res.json({
      searchResults: result,
    });
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
