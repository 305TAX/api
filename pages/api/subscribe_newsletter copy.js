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

  let odoo = new Odoo({
    url: "https://service.305tax.com",
    db: "305taxodoosh-main-7812556",
    username: "info@305tax.com",
    password: "Ddoc1935#$%",
  });

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

  const p = JSON.parse(req.body);

  //   const post_query = req.query;
  //   post_query.q = decodeURI(post_query.q);
  //   post_query.q = String(capitalized(String(post_query.q))).trim();

  let result;

  const test = {
    name: "John Dae",
    email: "johndae@example.com",
    list_ids: [0],
  };

  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }

    var inParams = [];
    inParams.push({
      name: String(p.name),
      email: String(p.email),
      list_ids: [0],
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw("mailing.contact", "create", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      console.log("Result CREATON >>>>>: ", value);
      return res.json({
        result: value,
        p: typeof p.subscription_list_ids,
        ls: p.subscription_list_ids,
      });
      // return res.json({
      //   response: true,
      //   result: value,
      // });
    });
  });
}
