//import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";
import { createHmac } from "node:crypto";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  //ODOO CONFIGURATION
  let odoo = new Odoo(odooConfig);

  const q = req.query;

  const secret = `${q?.crm_id}572023${Math.floor(Math.random() * 100)}`;
  const hash = createHmac("sha256", secret)
    .update("EMAIL-CONFIRMATION")
    .digest("hex");

  odoo.connect(function (err) {
    if (err) {
      return console.log(err, JSON.parse(req.body));
    }

    var inParams = [];
    inParams.push([Number(q?.crm_id)]); //id to update
    inParams.push({
      x_studio_status_verify_1: String(2),
      x_studio_status_verify_code_1: String(hash),
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw("crm.lead", "write", params, function (err, value) {
      if (err) {
        return console.log(err, JSON.parse(req.body));
      }

      return res.json({
        result: true,
      });
    });
  });
}
