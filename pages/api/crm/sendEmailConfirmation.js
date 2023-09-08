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

  if (q?.mode == "body") {
    const qbody = JSON.parse(JSON.stringify(req.body));
    q.crm_id = qbody?.crm_id;
  }

  const secret = `${q?.crm_id}572023${Math.floor(Math.random() * 100)}`;
  const hash = createHmac("sha256", secret)
    .update("EMAIL-CONFIRMATION")
    .digest("hex");

  const checkEmailConfirmation = new Promise((resolve, reject) => {
    odoo.connect(function (err) {
      if (err) {
        return console.log(err, JSON.parse(JSON.stringify(req.body)));
      }

      var inParams = [];

      inParams.push([Number(q?.crm_id)]);
      inParams.push({
        x_studio_status_verify_1: String(2),
        x_studio_status_verify_code_1: String(hash),
      });

      var params = [];
      params.push(inParams);

      odoo.execute_kw("crm.lead", "write", params, function (err, value) {
        if (err) {
          return console.log(err, JSON.parse(JSON.stringify(req.body)));
        }

        return resolve({
          result: true,
        });
      });
    });
  });

  const responseOne = await checkEmailConfirmation;
  return res.status(200).json(responseOne);
}
