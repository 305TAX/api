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

  const resultAno = {
    name: "Xd",
    mama: "jojo",
  };

  resultAno.web = {
    hello: "broo1",
  };

  return res.json({
    result: resultAno,
  });

  // try {
  //   const client = await clientPromise;
  //   const db = client.db("users_reviews");
  //   const response = await db.collection("users").deleteMany();
  //   return res.json({
  //     result: true,
  //   });
  // } catch (error) {
  //   return res.json({
  //     result: error,
  //   });
  // }
}
