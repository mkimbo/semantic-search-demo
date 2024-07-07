//export const runtime = "node.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tweets = new Schema(
  {
    content: { type: String, required: true },
    mediaId: { type: String, required: false },
    status: { type: String, required: false, default: "draft" },
    datePublished: [{ type: String, required: false }],
    sourceId: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Vehicle", tweets);

export default Tweet;
