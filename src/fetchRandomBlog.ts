import TweetSource from "./mongoose/tweet-source.js";

function getFormattedDate() {
  const date = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();

  const nth = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Special case for 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayOfWeek} ${dayOfMonth}${nth(dayOfMonth)} ${month} ${year}`;
}

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

  const allDocs = docs.map((doc) => {
    const id = doc._id;
    return {
      id: id.toString(),
      url: doc.url,
      summary: doc.summary,
      tweets: doc.tweets.join("\n"),
    };
  });

  const randomIndex = Math.floor(Math.random() * allDocs.length);
  const source = allDocs[randomIndex];
  return {
    doc: {
      id: source.id,
      blogUrl: source.url,
      summary: source.summary,
      tweets: source.tweets,
      date: getFormattedDate(),
    },
  };
};
