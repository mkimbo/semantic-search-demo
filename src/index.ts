// src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import getEmbeddings from "./getEmbeddings.js";
import fetchLittleData from "./fetchLittleData.js";
import fetchAllData from "./fetchAllData.js";
import convert from "./convertNumberToWords.js";
import saveToDb from "./saveToDb.js";
import scrapeLink from "./scrapeLink.js";
import scrapeLinkRetry from "./scrapeLinkRetry.js";
import search from "./search.js";
import updateTweetSource from "./updateTweetSource.js";
import fetchRandomBlog from "./fetchRandomBlog.js";
import fetchCarbyId from "./scrapeCarById.js";
import newAppwriteAppointment from "./newAppwriteAppointment.js";
import createUser, { UserData } from "./blog/createUser.js";
import dotenv from "dotenv";
import semanticSearch from "./semanticSearch.js";
import BlogUser from "./mongoose/blog/user.js";
import tweet from "./mongoose/tweet-source.js";
import { CreateAppointment } from "./types.js";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI!);
app.use(express.json());
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

    data.searchResults.sort(
      (a, b) =>
        parseInt(a.meta.searchScore.toString()) -
        parseInt(b.meta.searchScore.toString())
    );

    let topScore = data.searchResults[0].meta.searchScore.toString();

    if (parseFloat(topScore) < 0.7) {
      return res.json({
        searchResults: [],
      });
    }
    data.searchResults.forEach((item: any) => {
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

app.get("/scrape-link", (req: Request, res: Response) => {
  const link = req.query?.link as string;
  if (link) {
    scrapeLinkRetry(link).then((result) => {
      if (result) {
        res.json({ text: result });
      } else {
        console.log("called 2");

        scrapeLinkRetry(link).then((result) => {
          if (result) {
            res.json({ text: result });
          } else {
            res.json({ text: "N/A" });
          }
        });
      }
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

app.get("/get-random-blog-url", (req: Request, res: Response) => {
  fetchRandomBlog().then(({ doc }) => {
    res.json(doc);
  });
});

app.post("/update-tweet-source", (req: Request, res: Response) => {
  const data = req.body;
  updateTweetSource(data).then((data) => {
    res.json(data);
  });
});

app.post("/create-appwrite-appointment", (req: Request, res: Response) => {
  const data = req.body as CreateAppointment;
  newAppwriteAppointment(data).then((data) => {
    res.json(data);
  });
});

app.get("/blog-admin-login", (req: Request, res: Response) => {
  const adminData = {
    username: req.query?.username as string,
    password: req.query?.password as string,
  };

  BlogUser.findOne({ email: adminData.username }).then((user) => {
    if (user) {
      if (user.password === adminData.password) {
        res.json({
          success: true,
          user: {
            username: user.username,
            email: user.email,
            roles: user.roles,
          },
        });
      } else {
        res.json({ success: false, user: null });
      }
    } else {
      res.json({ success: false, user: null });
    }
  });
});
// app.get("/create-blog-admin", (req: Request, res: Response) => {
//   const adminData: UserData = {

//   };
//   createUser(adminData).then((data) => {
//     res.json({ res: data });
//   });
//   // }
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
