import clientPromise from "../../lib/mongodb";
import Odoo from "odoo-xmlrpc";

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

  const q = {
    type: "authorized_user",
    client_id:
      "640642969181-l2q87l7tf2ip9ibk1btdofnhml3nu22q.apps.googleusercontent.com",
    client_secret: "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",
    refresh_token:
      "1//05qvi6-ZXQ9p_CgYIARAAGAUSNwF-L9IriWLjBir7ibKQR2zDeJ9aBwAKT7MlwJ0PrkkESXvy3mSWEZcgYkFA19BgmnN8VGSO2Yc",
  };

  try {
    const client = await clientPromise;
    const db = client.db("users_reviews");

    const response = await db.collection("config").insertOne({
      googleContactToken: q,
    });

    if (response) {
      return res.json({
        result: true,
      });
    } else {
      return res.json({
        result: false,
        error: "001",
      });
    }
  } catch (error) {
    return res.json({
      result: false,
      error: error,
    });
  }
}
