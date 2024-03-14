import Car from "./mongoose/car.js";
import generateEmbeddings from "./generateEmbeddings.js";
import Vehicle from "./mongoose/vehicle.js";
import getEmbeddings from "./getEmbeddings.js";

export default async (searchQuery: string) => {
  const embeddings = await getEmbeddings(searchQuery);
  const docs = await Vehicle.aggregate([
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
        meta: {
          searchScore: { $meta: "searchScore" },
        },
      },
    },
  ]);
  return {
    searchResults: docs,
  };
};
