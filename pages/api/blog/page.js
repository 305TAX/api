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

  const postQuery = req.query;

  let result;
  let limitPerPage = 9;

  let offsetPage = req.query.page
    ? req.query.page == 1
      ? 0
      : req.query.page <= 2
      ? 9
      : 9 * (Number(req.query.page) - 1)
    : 0;
  //let ctPage = req.query.page ? (req.query.page == 1 ? 0 : req.query.page) : 0;

  function chunckArrayInGroups(arr, size) {
    var chunk = [],
      i; // declara array vacio e indice de for
    for (
      i = 0;
      i <= arr.length;
      i += size // loop que recorre el array
    )
      chunk.push(arr.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador
    return chunk;
  }

  if (req.query.page) {
    odoo.connect((err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Connected to Odoo server.");
      var inParams = [];
      inParams.push([["active", "=", true]]);
      inParams.push(Number(offsetPage)); //offset
      inParams.push(9); //limit
      inParams.push("id ASC");
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
        inParams.push([
          "tag_ids",
          "content",
          "website_url",
          "website_id",
          "name",
          "website_meta_title",
          "website_meta_description",
          "website_meta_keywords",
          "x_background_image",
          "is_published",
          "author_name",
          "published_date",
          "subtitle",
        ]);

        let params = [];
        params.push(inParams);

        odoo.execute_kw("blog.post", "read", params, async (err2, value2) => {
          if (err2) return console.log("ERROR:", err2);

          result = value2;
          result.sort((a, b) => b.id - a.id);
          let resultPublished = [];
          console.log(">>>", value2);

          for (let index = 0; index < result.length; index++) {
            const post = result[index];

            if (post.is_published == true) {
              resultPublished.push(post);
            }
          }
          console.log(">>>>>", offsetPage);
          let resultChunk = chunckArrayInGroups(resultPublished, 9)
          return res.json(resultChunk);
        });
      });
    });
  }
}
