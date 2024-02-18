import Car from "./mongoose/car.js"
import generateEmbeddings from "./generateEmbeddings.js";



export default async (searchQuery: string) => {
  const embeddings = await generateEmbeddings(searchQuery);
  const docs = await Car.aggregate(
    [
      {
        $search: {
          index: "indexedCars",
          knnBeta: {
            vector: embeddings,
            path: "embeddings",
            k: 100,
          },
        },
      },
      {
        "$limit": 5
      },
      {
        $project: { slug: 1, price: 1 },
      },
    ],
  )
  console.log(docs, "docs")
  return docs;
}