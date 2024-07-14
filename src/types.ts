export type TCar = {
  model: string;
  make: string;
  slug: string;
  price: string;
  year: string;
  thumbnail: string;
  mileage?: string;
  engine_size?: string;
  sales_agent?: string;
  horse_power?: string;
  unified_string: string;
};

export type TVehicle = {
  name: string;
  id: string;
  price: string;
  year: string;
  thumbnail: string;
  mileage?: string;
  sales_agent?: string;
  car_description: string;
  simplified_description: string;
};

export type CreateAppointment = {
  pId: string;
  doc: string;
  reason: string;
  start: string;
  end: string;
  status: string;
  note: string | undefined;
  name: string;
  email: string;
  phone: string;
  slotId: string;
};
