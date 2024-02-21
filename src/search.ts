import Car from "./mongoose/car.js";
import generateEmbeddings from "./generateEmbeddings.js";

export default async (searchQuery: string) => {
  const embeddings = await generateEmbeddings(searchQuery);
  const docs = await Car.aggregate([
    {
      $search: {
        index: "indexedCars",
        knnBeta: {
          vector: embeddings,
          path: "embeddings",
          k: 25,
        },
      },
    },
    {
      $limit: 15,
    },
    {
      $project: {
        slug: 1,
        price: 1,
        make: 1,
        model: 1,
        year: 1,
        thumbnail: 1,
        sales_agent: 1,
      },
    },
  ]);
  return {
    searchResults: docs,
  };
};
