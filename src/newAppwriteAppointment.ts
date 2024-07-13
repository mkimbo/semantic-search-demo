import { CreateAppointment } from "./types.js";
import * as sdk from "node-appwrite";
const client = new sdk.Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);
export default async (data: CreateAppointment) => {
  try {
    const databases = new sdk.Databases(client);
    const newAppointment = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.JANE_DOE_COLLECTION_ID!,
      sdk.ID.unique(),
      data
    );

    return { success: true, newId: newAppointment.$id };
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
    return { success: false };
  }
};
