import generateEmbeddings from "./generateEmbeddings.js";
import generateUnifiedData from "./generateUnifiedData.js";
import { TVehicle } from "./types.js";
import getEmbeddings from "./getEmbeddings.js";
import Vehicle from "./mongoose/vehicle.js";
import Car from "./mongoose/car.js";
export default async (carData: any[]): Promise<void> => {
  let i = 0;
  let data: any[] = [];
  console.log("getting embeddings...", data);
  try {
    for (const car of carData) {
      console.log(i++);
      const {
        name,
        price,
        mileage,
        car_description,
        simplified_description,
        id,
        sales_agent,
        year,
        thumbnail,
      }: TVehicle = generateUnifiedData(car).unifiedData;
      const embeddings = await getEmbeddings(car_description);
      data.push({
        nm: name,
        pr: price,
        dt: simplified_description,
        url: id,
        yr: year,
        img: thumbnail,
        emb: embeddings,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (data.length > 0) {
      Car.insertMany(data)
        .then(function () {
          console.log("Data inserted"); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    }
  }
  //TODO: needs update
  // let i = 0;
  // console.log("saving data...");
  // let data: any[] = [];
  // try {
  //   for (const car of carData) {
  //     console.log(i++);
  //     const { unifiedData } = generateUnifiedData(car);
  //     const embeddings = await generateEmbeddings(unifiedData.unified_string);
  //     data.push({
  //       ...unifiedData,
  //       embeddings: embeddings,
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   if (data.length > 0) {
  //     Car.insertMany(data)
  //       .then(function () {
  //         console.log("Data inserted"); // Success
  //       })
  //       .catch(function (error) {
  //         console.log(error); // Failure
  //       });
  //   }
  // }
};

//  {
//   "mappings": {
//     "dynamic": true,
//     "fields": {
//       "embeddings": [
//         {
//           "dimensions": 384,
//           "similarity": "cosine",
//           "type": "knnVector"
//         }
//       ]
//     }
//   }
// }
