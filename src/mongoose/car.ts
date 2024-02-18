// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: false },
  thumbnail: { type: String, required: false },
  year: { type: String, required: false }, // Made optional
  price: { type: String, required: true }, // 'price' field is required
  mileage: { type: String, required: false }, // Made optional
  unifiedString: { type: String, required: false }, // Made optional
  slug: { type: String, required: true }, // New required field
  embeddings: [{ type: Number, required: true }], // New required field (array of numbers)
  // New required field
});

const Car = mongoose.model('Car', carSchema);

export default Car;