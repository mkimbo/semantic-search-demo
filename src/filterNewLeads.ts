import getAllInstaLeads from "./getAllInstaLeads.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function filterNewLeads(): Promise<{
  success: boolean;
  all?: number;
  unique?: number;
  leads: string[];
}> {
  try {
    const filePath = path.join(__dirname, "leads.txt");
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Convert the file contents to an array by splitting on the newline character
    const leads = fileContents
      .split("\n")
      .map((lead) => lead.trim().replace(/\r$/, ""))
      .filter((lead) => lead !== "");

    const { currentLeads } = await getAllInstaLeads("schedlit");

    const new_leads = leads.filter(
      (lead: string) => !currentLeads.includes(lead)
    );

    return {
      success: true,
      all: leads.length,
      unique: new_leads.length,
      leads: new_leads,
    };
  } catch (error) {
    console.error("Error in filterNewLeads:", error);
    return {
      success: false,
      leads: [],
    };
  }
}
