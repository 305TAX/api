//import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let result;

  let odoo = new Odoo({
    url: "https://305tax.odoo.com",
    db: "305tax",
    username: "joalexint@gmail.com",
    password: "17569323Jouu1n*",
  });

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["active", "=", true]]);
    var params = [];
    params.push(inParams);

    odoo.connect(function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Connected to Odoo server.");
    });

    odoo.execute_kw("helpdesk.ticket", "search", params, async (err, value) => {
      if (err) return console.log("ERROR:", err);

      let inParams = [];
      inParams.push(value); //ids
      inParams.push([
        "name",
        "company_id",
        "email",
        "domain_user_ids",
        "commercial_partner_id",
        "kanban_state",
        "stage_id",
        "access_token",
        "active",
        "rating_avg_text",
      ]);

      let params = [];
      params.push(inParams);

      odoo.execute_kw("helpdesk.ticket", "read", params, (err2, value2) => {
        if (err2) return console.log("ERROR:", err2);

        result = value2;
        console.log(value2);
        return result;
      });
    });
  });

  const resultAno = {
    name: "Xd",
    mama: "jojo",
  };

  resultAno.web = {
    hello: "broo1",
  };

  return res.json({
    result: resultAno,
  });

  // try {
  //   const client = await clientPromise;
  //   const db = client.db("users_reviews");
  //   const response = await db.collection("users").deleteMany();
  //   return res.json({
  //     result: true,
  //   });
  // } catch (error) {
  //   return res.json({
  //     result: error,
  //   });
  // }
}
