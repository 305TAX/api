import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";
import unirest from "unirest";
import cheerio from "cheerio";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let url = "https://joalexurdaneta.com";

  async function replaceUrlsAndShorten(text) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    let newText = text;
    var match = "";
    while ((match = urlRegex.exec(text)) !== null) {
      try {
        let url = String(match[0]);
        const response = await fetch("http://localhost:3001/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        })
          .then((res) => res.json())
          .then((result) => {
            newText = newText.replace(
              match,
              `https://305tax.com/${result.key}`
            );
          });
      } catch (error) {
        console.log("Error", error);
      }
    }
    return newText;
  }

  const ts = await replaceUrlsAndShorten(
    "Hello dear https://google.com/ sin embargo si quieren ir a https://facebook.com/utm/peper/"
  );

  return res.json({
    result: ts,
  });
}
