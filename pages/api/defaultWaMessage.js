import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("users_reviews");
      const getconfig = await db.collection("config").find({}).toArray();
      const config = getconfig[0];

      return res.json({
        result: {
          messageDefault: config.messageWaDefault,
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else if (req.method === "POST") {
    const query = req.query;
    let messageWaDefault = query?.msgdf;
    try {
      const client = await clientPromise;
      const db = client.db("users_reviews");
      const saveconfig = await db
        .collection("config")
        .updateOne(
          { id_param: "general" },
          { $set: { messageWaDefault: messageWaDefault } }
        );

      return res.json({
        result: true,
      });
    } catch (error) {
      return res.json({
        result: false,
        error: error,
      });
    }
  }
}
