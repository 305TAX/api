import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
    const client = await clientPromise;
    const db = client.db("users_reviews");
    const getusers = await db.collection("users").find({}).toArray();

    return res.json(getusers);
  } catch (error) {
    console.error(e);
  }
}
