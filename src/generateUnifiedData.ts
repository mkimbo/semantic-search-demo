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
}


export default (car: any): { unifiedData: TCar } => {
  const make = car.model?.make?.name ?? "";
  const model = car.model?.name ?? "";
  const year = car.year_of_manufacture ?? "";
  const description = getRawDescription(car.description ?? "");
  const price = car.price ? "Ksh " + car.price : "";
  const slug = car.slug ?? "";
  const thumbnail = car.thumbnail ?? "";
  const body_type = car.body_type ?? "";
  const drive = car.drive ?? "";
  const mileage = car.mileage ? `Mileage is ${car.mileage}KM` : "";
  const color = car.color || ""; // Providing a default value if color is null
  const fuel_type = car.engine_specifications?.fuel_type ?? "";
  const engine_size = car.engine_specifications?.engine_size ? car.engine_specifications?.engine_size + "cc" : "";
  const horse_power = car.engine_specifications?.horse_power ? car.engine_specifications?.horse_power + "HP" : "";
  const air_conditioning = car.interior_features?.air_conditioning ? car.interior_features?.air_conditioning + " AC" : "";
  const seat_material = car.interior_features?.seat_material ? car.interior_features?.seat_material + " Seats" : "";
  const airbags = car.safety_features?.srs_air_bags ? "Has Airbags" : "";
  const parking_sensors = car.safety_features?.parking_sensors ? "Has Parking Sensors" : "";
  // Creating the unified string
  const unified_string = `${make} ${model} ${year} ${description} ${body_type} ${drive} ${mileage} ${color} ${fuel_type} ${engine_size} ${horse_power} ${air_conditioning} ${seat_material} ${airbags} ${parking_sensors} ${price}`;
  const unifiedData = {
    make,
    model,
    year,
    price,
    thumbnail,
    slug,
    mileage,
    engine_size,
    horse_power,
    unified_string,
  } as TCar;
  return {
    unifiedData
  };
}

const getRawDescription = (description: string): string => {
  //remove all special characters from string
  return description.replace(/[^\w\s]|[\r\n]/g, ' ');
}
