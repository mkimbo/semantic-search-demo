import Vehicle from "./mongoose/vehicle.js";
import getEmbeddings from "./getEmbeddings.js";
import Car from "./mongoose/car.js";

export default async (searchQuery: string) => {
  const embeddings = await getEmbeddings(searchQuery);
  const docs = await Car.aggregate([
    {
      $search: {
        index: "betterIndex",
        knnBeta: {
          vector: embeddings,
          path: "emb",
          k: 50,
        },
      },
    },
    // {
    //   $limit: 15,
    // },
    {
      $project: {
        url: 1,
        pr: 1,
        nm: 1,
        yr: 1,
        dt: 1,
        img: 1,
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
