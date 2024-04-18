import fs from "fs/promises";

// URL of the webpage you want to scrape
const url = "https://www.kaiandkaro.com/about-us";

import axios from "axios";
import * as cheerio from "cheerio";
interface ScrapedData {
  [key: string]: any;
}

export default async function scrapePage(url: string): Promise<any> {
  try {
    try {
      console.log("scarping...");
      // Fetch the webpage content
      const response = await axios.get(url);

      // Load the HTML content into Cheerio
      const $ = cheerio.load(response.data);

      const scrapedData: { articleNo?: number; articleLink?: string }[] = [];

      //Scraping the data
      $("h3.depth-1").each((index, element) => {
        const articleText = $(element).text();
        const match = articleText.match(/^(\d+)\.\s*(.*)/);
        if (match) {
          const articleNo = parseInt(match[1]);
          const articleLink = $(element).parent().attr("id");
          scrapedData.push({
            articleNo,
            articleLink:
              "https://www.constituteproject.org/constitution/Kenya_2010#" +
              articleLink,
          });
        }
      });
      $("h3.depth-2").each((index, element) => {
        const articleText = $(element).text();
        const match = articleText.match(/^(\d+)\.\s*(.*)/);
        if (match) {
          const articleNo = parseInt(match[1]);
          const articleLink = $(element).parent().attr("id");
          if (articleNo > 8) {
            scrapedData.push({
              articleNo,
              articleLink:
                "https://www.constituteproject.org/constitution/Kenya_2010#" +
                articleLink,
            });
          }
        }
      });

      console.log(
        scrapedData.length
        //scrapedData.sort((a, b) => a.articleNo! - b.articleNo!)
      );
      await fs.writeFile(
        "articleLinks.json",
        JSON.stringify(scrapedData.sort((a, b) => a.articleNo! - b.articleNo!))
      );
      return scrapedData.sort((a, b) => a.articleNo! - b.articleNo!);
      // Extract the text content without HTML tags
      // const rawText = $("body").text();
      //  await fs.writeFile("articleLinks.json", JSON.stringify(scrapedData));
      // Print or process the raw text data
      //console.log("done...");
    } catch (error) {
      console.error("Error scraping webpage:", error);
    }
  } catch (error: any) {
    console.error("Error fetching or parsing data:", error.message);
  }
}
