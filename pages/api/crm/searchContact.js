import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let odoo = new Odoo(odooConfig);
  const q = req.query;

  const createNewPartner = new Promise(async (resolve, reject) => {
    odoo.connect(function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Connected to Odoo server.");
      var inParams = [];

      inParams.push([["id", "=", 4463]]);

      inParams.push(["name", "x_studio_referred_by_many"]); //fields

      var params = [];
      params.push(inParams);
      odoo.execute_kw(
        "res.partner",
        "search_read",
        params,
        function (err, value) {
          if (err) {
            return console.log(err);
          }
          return resolve({
            result: value,
          });
        }
      );
    });
    // odoo.connect(async function (err) {
    //   if (err) {
    //     return console.log(err);
    //   }

    //   let inParams = [];
    //   inParams.push({
    //     name: String(q?.name),
    //     email: String(q?.email),
    //     mobile: String(q?.mobile),
    //     x_studio_country_origin: String(q?.country_origin),
    //     x_studio_status_verify: String(1),
    //     x_studio_,
    //   });

    //   let params = [];
    //   params.push(inParams);

    //   odoo.execute_kw(
    //     "res.partner",
    //     "create",
    //     params,
    //     async function (err, value) {
    //       if (err) {
    //         return console.log(err);
    //       }

    //       console.log("Result: ", value);

    //       if (value) {
    //         const crt = await createNewLeadCRM(value);

    //         if (crt?.state == true) {
    //           return resolve({
    //             status: true,
    //             result: [value, crt?.result],
    //           });
    //         }
    //       }
    //     }
    //   );
    // });
  });

  const responseOne = await createNewPartner;
  return res.status(200).json(responseOne);
}
