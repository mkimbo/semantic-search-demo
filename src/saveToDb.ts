import generateEmbeddings from "./generateEmbeddings.js";
import generateUnifiedData from "./generateUnifiedData.js";
import Car from "./mongoose/car.js";
import allData from "./newData.js";

export default async (): Promise<void> => {
  let i = 0;
  console.log("saving data...");

  let data: any[] = [];
  try {
    for (const car of allData) {
      console.log(i++);
      const { unifiedData } = generateUnifiedData(car);
      const embeddings = await generateEmbeddings(unifiedData.unified_string);
      data.push({
        ...unifiedData,
        embeddings: embeddings,
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
};
