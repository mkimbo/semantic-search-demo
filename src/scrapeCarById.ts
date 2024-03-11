import axios from "axios";
import * as cheerio from "cheerio";
import generateUnifiedData from "./generateUnifiedData.js";
interface ScrapedData {
  [key: string]: any;
}

export default async function scrapeData(
  url: string
): Promise<ScrapedData | null> {
  try {
    console.log("Scraping data from:", url);
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    // Use the specific selector for the script tag with ID '__NEXT_DATA__'
    const scriptTag = $("script#__NEXT_DATA__");

    if (scriptTag.length === 0) {
      throw new Error(
        'Script tag with ID "__NEXT_DATA__" not found on the page.'
      );
    }

    // Extract the JSON content inside the script tag
    const scriptContent = scriptTag.html();

    // Parse the JSON content
    const jsonData: ScrapedData = JSON.parse(scriptContent!);

    const carData = jsonData.props.pageProps.vehicle;

    const parsedData = generateUnifiedData(carData);

    return parsedData;
  } catch (error: any) {
    console.error("Error fetching or parsing data:", error.message);
    return null;
  }
}
