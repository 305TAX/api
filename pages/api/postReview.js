import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const reviewArray = req.query;

  //   try {
  //     let jsonParse = JSON.parse(reviewArray);

  //     const client = await clientPromise;
  //     const db = client.db("users_reviews");
  //     const getusers = await db.collection("users").insertOne(jsonParse);

  //     console.log(">>>>", JSON.parse(reviewArray));

  //     return res.status(200).send("Yes");
  //   } catch (error) {
  //     return res.status(400).json({
  //       error: error,
  //     });
  //   }

  return res.json({
    result: reviewArray,
  });
  //   try {
  //     const client = await clientPromise;
  //     const db = client.db("users_reviews");
  //     const getusers = await db.collection("users").find({}).toArray();

  //     return res.json(getusers);
  //   } catch (error) {
  //     console.error(e);
  //   }
}
