//import clientPromise from "../../lib/mongodb";
import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";
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
  let odoo = new Odoo(odooConfig);

  const query = req.query;

  console.log("REUSLT SUSCCESS", query);
  return res.json({
    result: query,
  });

  // odoo.connect(function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log("Connected to Odoo server.");

  //   var inParams = [];
  //   inParams.push([["id", "=", Number(query?.event_id)]]);
  //   inParams.push(["name", "start", "duration"]); //fields
  //   inParams.push(0); //offset
  //   inParams.push(5); //limit
  //   var params = [];
  //   params.push(inParams);
  //   odoo.execute_kw(
  //     "calendar.event",
  //     "search_read",
  //     params,
  //     async function (err, value) {
  //       if (err) {
  //         return console.log(err);
  //       }

  //       const result = value[0];
  //       const time = Number((60 * Number(value[0].duration)).toFixed(0));
  //       result.duration = time;

  //       try {
  //         const fetchingHook = await fetch(
  //           "https://hooks.zapier.com/hooks/catch/15998712/31tc0ed/",
  //           {
  //             method: "POST",
  //             body: JSON.stringify(result),
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         const resultFetch = await fetchingHook.json();

  //         return res.json({
  //           state: true,
  //           result_zoom: resultFetch,
  //         });
  //       } catch (error) {
  //         return res.json({
  //           state: false,
  //           error: error,
  //         });
  //       }
  //     }
  //   );
  // });

  // const query = JSON.parse(JSON.stringify(req.body));
  //   const query = {
  //     companyname: "Brandon Test",
  //     email: "joalexint@gmail.com",
  //     displayname: "Brandon Test",
  //     familyname: "Brandon Test",
  //     phonenumber: "+584246002286",
  //     givenname: "Brandon Test",
  //   };

  // const newContact = {
  //   givenName: String(query?.displayname),
  //   email: String(query?.email),
  //   mobile: String(query?.phonenumber),
  // };

  // CREATE GOOGLE CONTACT

  // const jsonQuery = new URLSearchParams(newContact).toString();
  // const linkResponse = `${process.env.QB_API}/create_google_contact?${jsonQuery}`;

  // const response = await fetch(linkResponse, {
  //   method: "POST",
  // });
  // const result = await response.json();

  // console.log("RESULT", linkResponse, result);

  //   const queryStringify = JSON.stringify(query);
  //   console.log("REQ BODY", queryStringify);
  //   let xds = String(process.env.QB_API);

  // return res.json({
  //   result: result,
  // });
}
