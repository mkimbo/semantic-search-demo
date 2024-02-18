import { pipeline } from '@xenova/transformers';


export default async (data: string): Promise<number[]> => {
  const generateEmbeddings = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
  );

  const embeddings = await generateEmbeddings(data, {
    pooling: 'mean',
    normalize: true,
  });
  return Array.from(embeddings.data);
}
