// const mongoose = require('mongoose');
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dentalLeadsSchema = new Schema({
  instagram_usernames: [{ type: String, required: true }], // New required field (array of numbers)
  name: { type: String, required: true },
  // New required field
});

const DentalLead = mongoose.model("DentalLead", dentalLeadsSchema);

export default DentalLead;
