import convert from "./convertNumberToWords.js";

type TCar = {
  model: string;
  make: string;
  slug: string;
  thumbnail: string;
  price: string;
  year: string;
  mileage?: string;
  engine_size?: string;
  horse_power?: string;
  unified_string: string;
};

export default (car: any): { unifiedData: TCar } => {
  const make = car.model?.make?.name ?? "";
  const model = car.model?.name ?? "";
  const year = car.year_of_manufacture
    ? "Manufactured in " + convert(car.year_of_manufacture) + ","
    : "";
  const sales_agent = car.agent_whatsapp_contact ?? "";
  const description = getRawDescription(car.description ?? "");
  const price =
    car.price && car.price_currency == "KES"
      ? "is priced at " + convert(car.price) + "."
      : "";
  const slug = car.slug ?? "";
  const thumbnail = car.thumbnail ?? "";
  const body_type = car.body_type ?? "";
  const drive = car.drive ?? "";
  const mileage = car.mileage
    ? `Mileage is ${convert(car.mileage)} ${car.mileage_unit ?? ""}`
    : "";
  const transmission = car.transmission
    ? car.transmission + " transmission" + ","
    : ""; // Providing a default value if color is null
  const fuel_type = car.engine_specifications?.fuel_type ?? "";
  const engine_size = car.engine_specifications?.engine_size
    ? convert(car.engine_specifications?.engine_size) +
      " cc " +
      fuel_type +
      " engine"
    : "";
  const horse_power = car.engine_specifications?.horse_power
    ? " with " +
      convert(car.engine_specifications?.horse_power) +
      " horsepower."
    : "";
  const air_conditioning = car.interior_features?.air_conditioning
    ? car.interior_features?.air_conditioning + " AC"
    : "";
  const seat_material = car.interior_features?.seat_material
    ? car.interior_features?.seat_material + " Seats"
    : "";
  const safety_features = car.safety_features
    ? "Safety " + featuresInclude(car.safety_features)
    : "";
  const interior_features = car.interior_features
    ? "Interior " + featuresInclude(car.interior_features)
    : "";
  // Creating the unified string
  const unified_string = `${year} ${make} ${model} ${price}  ${description} General features include ${body_type}, ${drive}, ${transmission} ${engine_size}${horse_power} ${mileage}. ${interior_features}, ${air_conditioning}, ${seat_material}. ${safety_features}`;
  const unifiedData = {
    make,
    model,
    year: car.year_of_manufacture?.toString() ?? "",
    price: car.price?.toString() ?? "",
    thumbnail,
    slug,
    mileage: car.mileage?.toString() ?? "",
    engine_size: car.engine_specifications?.engine_size?.toString() ?? "",
    horse_power: car.engine_specifications?.horse_power?.toString() ?? "",
    sales_agent,
    unified_string,
  } as TCar;
  return {
    unifiedData,
  };
};

const getRawDescription = (description: string): string => {
  return description.replace(/[^\w\s]|[\r\n]/g, " ");
};

function featuresInclude(features: { [s: string]: boolean | number }) {
  let featureList = [];
  for (const [key, value] of Object.entries(features)) {
    if (
      key === "number_of_airbags" &&
      value &&
      parseInt(value.toString()) > 0
    ) {
      featureList.push(`${convert(parseInt(value.toString()))} airbags`);
    } else if (
      key === "number_of_seats" &&
      value &&
      parseInt(value.toString()) > 0
    ) {
      featureList.push(`${convert(parseInt(value.toString()))} seats`);
    } else if (value === true) {
      let featureName = key.replace(/_/g, " ");
      featureList.push(featureName);
    }
  }
  return "features include " + featureList.join(", ");
}
