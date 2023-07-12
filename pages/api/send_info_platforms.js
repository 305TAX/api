//import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  /** VARIABLES */
  const currentYear = new Date().getFullYear();
  const customerOdoo = JSON.parse(JSON.stringify(req.body));

  if (String(customerOdoo?.invoice).toUpperCase() == "TRUE") {
    console.log("INVOICE ACTIVO", customerOdoo);
  } else {
    console.log("INVOICE FALSE", customerOdoo);
  }

  return res.json({
    currentYear: currentYear,
  });
}
