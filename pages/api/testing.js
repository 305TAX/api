// import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";
import NextCors from "nextjs-cors";
import unirest from "unirest";
import { odooConfig } from "../../lib/odooConfig";
import cheerio from "cheerio";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let odoo = new Odoo(odooConfig);

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["stage_id", "=", 1]]);
    inParams.push(["name", "mobile", "email_from"]);
    var params = [];
    params.push(inParams);

    // 4- Read
    odoo.execute_kw("crm.lead", "search_read", params, async (err, value) => {
      if (err) return console.log("ERROR:", err);

      const result = value;

      await Promise.all(
        result.map(async (val, index) => {
          try {
            const newContact = {
              givenName: String(val?.name),
              email: String(val?.email_from),
              mobile: String(val?.mobile),
            };

            //CREATE GOOGLE CONTACT

            const jsonQuery = new URLSearchParams(newContact).toString();

            const linkResponse = `http://localhost:3002/create_google_contact?${jsonQuery}`;

            const response = await fetch(linkResponse, {
              method: "POST",
            });
            const result = await response.json();
            console.log("RESULTADO", true);
          } catch (error) {
            console.log(error);
          }
        })
      );

      return res.json({
        result: result,
      });
    });
  });
}
