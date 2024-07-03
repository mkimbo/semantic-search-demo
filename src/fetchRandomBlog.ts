import TweetSource from "./mongoose/tweet.js";

export default async () => {
  //find all docs where tweets are less than 5
  const docs = await TweetSource.find({
    $expr: {
      $lte: [
        {
          $size: "$tweets",
        },
        5,
      ],
    },
  });
  return {
    docs: docs.map((doc) => {
      const id = doc._id;
      return {
        id: id.toString(),
        url: doc.url,
        summary: doc.summary,
        tweets: doc.tweets.join(","),
      };
    }),
  };
};
