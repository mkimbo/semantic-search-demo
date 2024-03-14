import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (data: string): Promise<number[]> => {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: data,
    encoding_format: "float",
    dimensions: 384,
  });

  return embedding.data[0].embedding;
};
