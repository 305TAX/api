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

  const query = JSON.parse(JSON.stringify(req.body));
  //   const query = {
  //     companyname: "Brandon Test",
  //     email: "joalexint@gmail.com",
  //     displayname: "Brandon Test",
  //     familyname: "Brandon Test",
  //     phonenumber: "+584246002286",
  //     givenname: "Brandon Test",
  //   };

  const newContact = {
    givenName: String(query?.displayname),
    email: String(query?.email),
    mobile: String(query?.phonenumber),
  };

  //CREATE GOOGLE CONTACT

  const response = await fetch(`${process.env.QB_API}/create_google_contact`, {
    method: "POST",
    body: JSON.stringify(newContact),
  });

  const result = await response.json();
  console.log("result", result)

  //   const queryStringify = JSON.stringify(query);
  //   console.log("REQ BODY", queryStringify);
  //   let xds = String(process.env.QB_API);

  return res.json({
    result: result,
  });
}
