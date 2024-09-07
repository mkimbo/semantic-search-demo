// import axios from "axios";
import * as cheerio from "cheerio";
import axios from "axios";
// export default async function scrapeLink(url: string): Promise<string | null> {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     const relevantElements = "h1, h2, h3, h4, h5, h6, p, div, li";
//     let textContent = "";
//     $(relevantElements).each((index, element) => {
//       textContent += $(element).text() + " ";
//     });
//     return textContent.replace(/\s+/g, " ").trim();
//   } catch (error: Error | any) {
//     console.error(`Error fetching the URL: ${error.message}`);
//     return null;
//   }
// }

async function scrapeTextFromUrl(
  link: string,
  options: {
    timeout?: number;
    maxContentLength?: number;
    userAgent?: string;
  } = {}
) {
  const {
    timeout = 10000,
    maxContentLength = 5000000, // 5MB
    userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  } = options;
  const url = link;
  try {
    const { data } = await axios.get(url, {
      timeout,
      maxContentLength,
      headers: {
        "User-Agent": userAgent,
      },
    });

    const $ = cheerio.load(data);

    // Remove script and style elements
    $("script, style").remove();

    // Function to check if an element is visible
    const isVisible = (element: any) => {
      return !(
        element.css("display") === "none" ||
        element.css("visibility") === "hidden"
      );
    };

    // Function to get text from an element and its children
    const getTextFromElement = (element: any): string => {
      if (element.children().length === 0) {
        return element.text().trim();
      }

      return element
        .contents()
        .map((_: any, el: any) => {
          if (el.type === "text") {
            return $(el).text().trim();
          } else if (el.type === "tag" && isVisible($(el))) {
            return getTextFromElement($(el));
          }
          return "";
        })
        .get()
        .join(" ");
    };

    // Array to store all text content
    const textParts: string[] = [];

    // Main content selectors
    const mainContentSelectors = [
      "article",
      "main",
      ".main-content",
      "#main-content",
      '[role="main"]',
      ".content",
      "#content",
    ];

    // Find main content area
    let mainContent = $("body");
    for (const selector of mainContentSelectors) {
      if ($(selector).length) {
        mainContent = $(selector) as cheerio.Cheerio<cheerio.Element>;
        break;
      }
    }

    // Extract text from main content area
    mainContent.find("*").each((_, element) => {
      const $element = $(element);
      if (isVisible($element)) {
        const elementText = getTextFromElement($element);
        if (elementText) {
          textParts.push(elementText);
        }

        // Check for ARIA labels
        const ariaLabel = $element.attr("aria-label");
        if (ariaLabel) {
          textParts.push(ariaLabel);
        }
      }
    });

    // Extract meta description
    const metaDescription = $('meta[name="description"]').attr("content");
    if (metaDescription) {
      textParts.unshift(metaDescription);
    }

    // Extract title
    const title = $("title").text();
    if (title) {
      textParts.unshift(title);
    }

    // Clean and join the text
    return textParts.join(" ").replace(/\s+/g, " ").trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Network error: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`Error scraping URL: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    return null;
  }
}

export default scrapeTextFromUrl;
