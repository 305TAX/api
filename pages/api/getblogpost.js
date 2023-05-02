import clientPromise from "../../lib/mongodb";

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

  const postQuery = req.query;

  let result;

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["active", "=", true]]);
    var params = [];
    params.push(inParams);

    // 1- Login
    odoo.connect(function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Connected to Odoo server.");
    });

    // 4- Read
    odoo.execute_kw("blog.post", "search", params, (err, value) => {
      if (err) return console.log("ERROR:", err);

      let inParams = [];
      inParams.push(value); //ids
      inParams.push([]);

      let params = [];
      params.push(inParams);

      odoo.execute_kw("blog.post", "read", params, async (err2, value2) => {
        if (err2) return console.log("ERROR:", err2);

        result = value2;

        for (let index = 0; index < result.length; index++) {
          const post = result[index];

          if (String(post.website_url).split("/")[3] == postQuery.p) {
            return res.json(post);
          }
        }
        return res.status(404).json({
          error: "No existe el blog",
        });
      });
    });
  });
}
