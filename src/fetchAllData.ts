import fetch from "node-fetch";
import fst from "fs";
import dotenv from "dotenv";
dotenv.config();
import cleanData from "./generateUnifiedData.js";
import saveToDB from "./saveToDb.js";
let fs = fst.promises;

const API_URL = process.env.DATA_SOURCE;
// Replace with your actual API URL
const ITEMS_PER_PAGE = 25;
const TOTAL_ITEMS = 2276;
const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

async function fetchAllData() {
  let allData: any[] = [];
  console.log("fetching data...");
  for (let page = 1; page <= totalPages; page++) {
    try {
      const response = await fetch(`${API_URL}${page}`);
      if (!response.ok) {
        throw new Error(`Error fetching page ${page}: ${response.statusText}`);
      }
      console.log(page);
      const data: any = await response.json();
      if (data) {
        allData = allData.concat(
          data["pageProps"]["vehicles"].filter(
            (item: any) => item["purchase_status"] == "Available"
          )
        );
      }
      // Assuming each page returns an array of items
    } catch (error) {
      console.error(error);
      break; // Stop fetching if an error occurs
    }
  }
  // const response = await fetch(`${API_URL}`);
  // if (!response.ok) {
  //   throw new Error(`Error fetching data: ${response.statusText}`);
  // }
  // const data: any = await response.json();
  // if (data) {
  //   allData = [...data["pageProps"]["vehicles"]];
  //   console.log(" data", data["pageProps"]["vehicles"][0]);
  // }

  console.log(allData.length, "allData.legnth");
  return allData;

  //return allData;
}
// refactor to fetch to db directly
async function saveDataToDB() {
  try {
    const data = await fetchAllData();
    await saveToDB(data);
    console.log(`Data successfully saved to db`);
  } catch (error) {
    console.error(`Error saving data to db: ${error}`);
  }
}

export default async function fetchData() {
  saveDataToDB();
}
