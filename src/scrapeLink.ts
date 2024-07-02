import axios from "axios";
import * as cheerio from "cheerio";

export default async function scrapeLink(url: string): Promise<string | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const relevantElements = "h1, h2, h3, h4, h5, h6, p,  li";
    let textContent = "";
    $(relevantElements).each((index, element) => {
      textContent += $(element).text() + " ";
    });
    return textContent.replace(/\s+/g, " ").trim();
  } catch (error: Error | any) {
    console.error(`Error fetching the URL: ${error.message}`);
    return null;
  }
}
