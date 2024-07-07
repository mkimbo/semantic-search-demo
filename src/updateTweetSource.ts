import TweetSource from "./mongoose/tweet-source.js";
import Tweet from "./mongoose/tweet.js";
export default async (data: { id: string; tweet: string }) => {
  console.log(data, "data");

  await TweetSource.findOneAndUpdate(
    { _id: data.id },
    { $push: { tweets: data.tweet } },
    { new: true }
  );

  const res = await Tweet.create({
    sourceId: data.id,
    content: data.tweet,
    status: "draft",
  });

  return { success: true, tweetId: res._id.toString() };
};
