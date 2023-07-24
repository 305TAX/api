//import clientPromise from "../../lib/mongodb";
// import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
// import { odooConfig } from "../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  //ODOO CONFIGURATION
//   let odoo = new Odoo(odooConfig);
  const query = req.body;
  //CREATE PARTNER

  console.log("REQ BODY", req.body);
  return res.json({
    result: req.body,
  });
}
