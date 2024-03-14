// const mongoose = require('mongoose');
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: false },
  year: { type: String, required: false }, // Made optional
  sales_agent: { type: String, required: false }, // Made optional
  price: { type: String, required: true }, // 'price' field is required
  mileage: { type: String, required: false }, // Made optional
  car_description: { type: String, required: false }, // Made optional
  slug: { type: String, required: true }, // New required field
  embeddings: [{ type: Number, required: true }], // New required field (array of numbers)
  // New required field
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
