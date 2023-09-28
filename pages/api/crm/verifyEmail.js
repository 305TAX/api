import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../../lib/odooConfig";
import { createHmac } from "node:crypto";
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

  const sendVerifyEmail = async (value) => {
    return await new Promise((resolve, reject) => {
      odoo.connect(function (err) {
        if (err) {
          return console.log(err);
        }

        var inParams = [];
        inParams.push([Number(value[0]?.id)]); //id to update
        inParams.push({
          x_studio_status_verify_1: String(3),
        });

        var params = [];
        params.push(inParams);
        odoo.execute_kw(
          "crm.lead",
          "write",
          params,
          async function (err2, value2) {
            if (err2) {
              return console.log(err2);
            }

            return resolve({
              state: true,
              result: true,
            });
          }
        );
      });
    });
  };

  const verifyEmail = new Promise(async (resolve, reject) => {
    odoo.connect(async function (err) {
      if (err) {
        return console.log(err);
      }

      var inParams = [];
      inParams.push([["x_studio_status_verify_code_1", "=", String(q?.hash)]]);
      inParams.push(["id", "x_studio_status_verify_1"]); //fields

      var params = [];
      params.push(inParams);

      
      odoo.execute_kw(
        "crm.lead",
        "search_read",
        params,
        async function (err, value) {
          if (err) {
            return console.log(err);
          }

          if (value) {
            if (Number(value[0]?.x_studio_status_verify_1) >= "3")
              return resolve({
                result: {
                  exist: true,
                },
              });

            const crt = await sendVerifyEmail(value);

            if (crt?.state == true) {
              return resolve({
                result: crt?.result,
              });
            }
          } else {
            return res.json({ result: false });
          }
        }
      );
    });
  });

  const responseOne = await verifyEmail;
  return res.status(200).json(responseOne);
}
