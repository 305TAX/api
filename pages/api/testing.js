//import clientPromise from "../../lib/mongodb";

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

  async function replaceUrlsAndShorten(text) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    let newText = text;
    var match = "";
    while ((match = urlRegex.exec(text)) !== null) {
      const response = await fetch("https://305tax.com/api/shorten", {
        method: "POST",
        body: String(match),
      });
      const data = await response.json();
      newText = newText.replace(match, `https://305tax.com/${data[0].key}`);
    }
    return newText;
  }

  // async function replaceUrlsAndAddNumber(text) {
  //   const urlRegex = /https?:\/\/[^\s]+/g;
  //   let count = 1;
  //   const newText = text.replace(urlRegex, async (url) => {

  //

  //     //
  //     console.log(url, data[0].key)
  //     return data[0]?.key;
  //   });
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   return newText;
  // }

  const text =
    "Les dejoe l link de descarga directo del report https://305tax.com/download-report?utm_source=facebook";
  const newText = await replaceUrlsAndShorten(text);
  console.log(newText);

  return res.json({
    result: newText,
    olk: "ojitoo",
  });

  // const getData = () => {
  //   return unirest
  //     .get(
  //       "https://www.google.com/search?q=305tax&oq=305tax&aqs=chrome.0.69i59j35i39j0i13i512j69i60l5.1295j0j4&sourceid=chrome&ie=UTF-8&bshm=lbsc/1#lrd=0x88d9b97e7aaddef9:0x2bb8173b05da3e65,1,,,,"
  //     )
  //     .headers({
  //       "User-Agent":
  //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
  //     })
  //     .then((response) => {
  //       console.log(response.body);
  //       return res.send(response.body)
  //     });
  // };

  // getData()
}
