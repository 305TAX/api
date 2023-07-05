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
  const q = req.query;

  //CREATE NEW PARTNER

  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }

    let inParams = [];
    inParams.push({
      name: String(q?.name),
      email: String(q?.email),
      mobile: String(q?.mobile),
      x_studio_country_origin: String(q?.country_origin),
      x_studio_status_verify: String(1),
    });

    let params = [];
    params.push(inParams);

    odoo.execute_kw("res.partner", "create", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      console.log("Result: ", value);

      if (value) {
        odoo.connect(function (err2) {
          if (err2) {
            return console.log(err2);
          }

          let inParams2 = [];
          inParams2.push({
            partner_id: value,
            name: String(q?.name).toUpperCase(),
            email_from: String(q?.email),
            user_id: "",
          });

          let params2 = [];
          params2.push(inParams2);

          odoo.execute_kw(
            "crm.lead",
            "create",
            params2,
            function (err2, value2) {
              if (err2) {
                return console.log(err2);
              }
              console.log("Result: ", value2);
              return res.json({
                result: [value, value2],
              });
            }
          );
        });
      }

      // return res.json({
      //   result: value,
      // });
    });
  });
}
