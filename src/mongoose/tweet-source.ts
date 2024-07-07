import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    url: { type: String, required: true },
    summary: { type: String, required: false },
    tweets: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

const TweetSource = mongoose.model("TweetSource", tweetSchema);

export default TweetSource;
