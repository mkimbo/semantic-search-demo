import TweetSource from "./mongoose/tweet.js";

export default async (data: { id: string; tweet: string }) => {
  console.log(data, "data");

  await TweetSource.findOneAndUpdate(
    { _id: data.id },
    { $push: { tweets: data.tweet } },
    { new: true }
  );
  return { success: true };
};
