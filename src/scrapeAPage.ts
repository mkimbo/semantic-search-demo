import fs from "fs/promises";

// URL of the webpage you want to scrape
const url = "https://www.kaiandkaro.com/about-us";

import axios from "axios";
import * as cheerio from "cheerio";
interface ScrapedData {
  [key: string]: any;
}

export default async function scrapePage(url: string): Promise<void> {
  try {
    try {
      console.log("scarping...");
      // Fetch the webpage content
      const response = await axios.get(url);

      // Load the HTML content into Cheerio
      const $ = cheerio.load(response.data);

      // Extract the text content without HTML tags
      const rawText = $("body").text();
      await fs.writeFile("scraped.txt", JSON.stringify(rawText));
      // Print or process the raw text data
      console.log("done...");
    } catch (error) {
      console.error("Error scraping webpage:", error);
    }
  } catch (error: any) {
    console.error("Error fetching or parsing data:", error.message);
  }
}
