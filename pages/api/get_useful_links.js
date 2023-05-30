//import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";

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

  //QUERY
  const p = req.query;

  const capitalized = (word) => {
    let wordSplit = String(word).split(" ");
    let result = "";
    for (let index = 0; index < wordSplit.length; index++) {
      const element = wordSplit[index];
      result = result.concat(
        element.charAt(0).toUpperCase() + element.slice(1) + " "
      );
    }

    return result;
  };

  //FUNCTION
  odoo.connect((err) => {
    if (err) {
      console.log("ERROR", err);
      return res.json({
        error: err,
      });
    }

    let inParams = [];
    inParams.push([]);
    inParams.push([
      "display_name",
      "id",
      "x_studio_description",
      "x_studio_href",
      "x_studio_category",
      "x_studio_translate_to_spanish",
    ]);

    let params = [];
    params.push(inParams);

    odoo.execute_kw("x_useful_links", "search_read", params, (err, value) => {
      if (err) return console.log("ERROR:", err);

      if (value.length < 1) return res.json([]);

      return res.json(value);
    });
  });
}
