import clientPromise from "../../../lib/mongodb";
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

  const sendFormLead = new Promise(async (resolve, reject) => {
    odoo.connect(function (err) {
      if (err) {
        return console.log(err);
      }

      var inParams = [];
      inParams.push([Number(q?.info_lead.crm_id)]); //id to update
      inParams.push({
        x_studio_temp_stage: String(1),
      });

      var params = [];
      params.push(inParams);

      odoo.execute_kw("crm.lead", "write", params, async function (err, value) {
        if (err) {
          return console.log(err);
        }

        try {
          const client = await clientPromise;
          const db = client.db("users_reviews");

          const response = await db.collection("forms").insertOne(q);

          if (response) {
            return resolve({
              result: true,
            });
          } else {
            return resolve({
              result: false,
              error: "001",
            });
          }
        } catch (error) {
          return resolve({
            result: false,
            error: error,
          });
        }
      });
    });
  });

  const responseOne = await sendFormLead;
  return res.status(200).json(responseOne);
}
