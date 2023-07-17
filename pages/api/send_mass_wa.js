//import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  /** VARIABLES */
  const currentYear = new Date().getFullYear();
  const qbody = JSON.parse(req.body);

  console.log("El resultado es", qbody);

  return res.json({
    current: qbody,
  });
}
