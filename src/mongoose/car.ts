// const mongoose = require('mongoose');
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  nm: { type: String, required: true },
  img: { type: String, required: false },
  yr: { type: String, required: false }, // Made optional
  pr: { type: String, required: true }, // Made optional
  dt: { type: String, required: false }, // Made optional
  url: { type: String, required: true }, // New required field
  emb: [{ type: Number, required: true }], // New required field (array of numbers)
  // New required field
});

const Car = mongoose.model("Car", carSchema);

export default Car;
