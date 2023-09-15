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

  let isRosafrancia = q?.isRosafrancia ? true : false;
  let referredBy = q?.referredBy ? q?.referredBy : false;

  const createNewLeadCRM = async (data) => {
    return await new Promise((resolve, reject) => {
      odoo.connect(function (err) {
        if (err) {
          return console.log(err);
        }

        let inParams = [];

        inParams.push({
          partner_id: data,
          name: String(q?.name).toUpperCase(),
          email_from: String(q?.email),
          user_id: "",
        });

        let params = [];
        params.push(inParams);

        odoo.execute_kw("crm.lead", "create", params, function (err2, value2) {
          if (err2) {
            return console.log(err2);
          }

          return resolve({
            state: true,
            result: value2,
          });
        });
      });
    });
  };

  const createNewPartner = new Promise(async (resolve, reject) => {
    odoo.connect(async function (err) {
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
        x_studio_isrosafrancia: isRosafrancia,
        x_studio_referred_by_many: referredBy,
        x_studio_contact_origin: String(q?.contact_origin),
      });

      let params = [];
      params.push(inParams);

      odoo.execute_kw(
        "res.partner",
        "create",
        params,
        async function (err, value) {
          if (err) {
            return console.log(err);
          }

          console.log("Result: ", value);

          if (value) {
            const crt = await createNewLeadCRM(value);

            if (crt?.state == true) {
              return resolve({
                status: true,
                result: [value, crt?.result],
              });
            }
          }
        }
      );
    });
  });

  const responseOne = await createNewPartner;
  return res.status(200).json(responseOne);
}
