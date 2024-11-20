import axios from "axios";
import { TSearchResponse, TSearchResults } from "./types.js";
export default async function scrapeLink(
  query: string
): Promise<TSearchResults | null> {
  try {
    const res = await axios.get<TSearchResponse>(
      `http://api.serpstack.com/search?access_key=${process.env.SERPAPI_API_KEY}&query=${query}&num=5`
    );
    const results = res.data.organic_results;
    const urls = results.map((result) => {
      return {
        url: result.url,
      };
    });

    const data = {
      searchResults: results.map((result) => {
        return {
          title: result.title,
          snippet: result.snippet,
          url: result.url,
          position: result.position,
        };
      }),
      extractedUrls: urls,
    };

    return data;
  } catch (error: Error | any) {
    console.error(`Error Searching: ${error.message}`);
    return null;
  }
}
