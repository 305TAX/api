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
  const query = req.body;
  //CREATE PARTNER

  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }

    let inParams = [];
    inParams.push({
      name: String(query?.full_name),
      email: String(query?.email),
      mobile: String(query?.mobile),

      x_studio_ad_id: String(query?.ad_id),
      x_studio_ad_name: String(query?.ad_name),
      x_studio_adset_id: String(query?.adset_id),
      x_studio_adset_name: String(query?.adset_name),
      x_studio_ad_campaign_id: String(query?.campaign_id),
      x_studio_ad_campaign_name: String(query?.campaign_name),
      x_studio_ad_created_time: String(query?.created_time),
      x_studio_ad_form_id: String(query?.form_id),
      x_studio_ad_form_name_1: String(query?.form_name),
      x_studio_ad_lead_id: String(query?.id),
      x_studio_ad_is_organic: String(query?.is_organic),
      x_studio_ad_page_id: String(query?.page_id),
      x_studio_ad_page_name: String(query?.page_name),
      x_studio_ad_platform: String(query?.platform),
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
            name: String(query?.full_name).toUpperCase(),
            email_from: String(query?.email),
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
    });
  });
}
