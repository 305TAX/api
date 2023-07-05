import clientPromise from "../../lib/mongodb";
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

  const q = JSON.parse(req.body);

  let odoo = new Odoo(odooConfig);

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
          return res.json({
            result: true,
          });
        } else {
          return res.json({
            result: false,
            error: "001",
          });
        }
      } catch (error) {
        return res.json({
          result: false,
          error: error,
        });
      }
    });
  });
}
