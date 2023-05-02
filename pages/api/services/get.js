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

  const post_query = req.query;
  post_query.q = decodeURI(post_query.q);
  post_query.q = String(post_query.q).trim();

  console.log("ENCODEEEEEEEE", post_query.q);

  let result;
  let backupPage = [];
  let limitPerPage = 9;

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["x_name", "=", post_query.q]]);
    //inParams.push(0); //offset
    //inParams.push(limitPerPage); //limit
    inParams.push([
      "x_name",
      "x_page",
      "x_appointment_relation",
      "x_description_service",
      "x_studio_steps",
      "x_related_posts",
    ]);
    var params = [];
    params.push(inParams);

    // 1- Login
    // odoo.connect(function (err) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log("Connected to Odoo server.");
    // });

    // 4- Read
    odoo.execute_kw(
      "x_305tax_services",
      "search_read",
      params,
      (err, value) => {
        if (err) return console.log("ERROR:", err);

        if (value.length < 1) return res.json([]);

        let inParams2 = [];
        inParams2.push([["id", "=", value[0].x_page[0]]]);

        let params2 = [];
        params2.push(inParams2);

        odoo.execute_kw(
          "website.page",
          "search_read",
          params2,
          async (err2, value2) => {
            if (err2) return console.log("ERROR:", err2);

            let inParams3 = [];
            inParams3.push([["x_305tax_services_id", "=", value[0].id]]);

            let params3 = [];
            params3.push(inParams3);
            odoo.execute_kw(
              "x_305tax_services_line_35d5c",
              "search_read",
              params3,
              async (err3, value3) => {
                if (err3) return console.log("ERROR:", err3);

                const blogRel = [];

                await value[0].x_related_posts.forEach(async (element) => {
                  let inParams4 = [];
                  inParams4.push([["id", "=", element]]);
                  inParams4.push(["display_name"]);
                  let params4 = [];
                  params4.push(inParams4);

                  odoo.execute_kw(
                    "blog.post",
                    "search_read",
                    params4,
                    async (err4, value4) => {
                      if (err4) return console.log("ERROR:", err4);
                      blogRel.push(element);
                    }
                  );
                });

                result = value2[0];
                return res.json({
                  result: result,
                  page: value[0],
                  page_steps: value3,
                  blog_rel: blogRel,
                });

                //return res.json(value3);
              }
            );
          }
        );

        // odoo.execute_kw(
        //   "helpdesk.ticket",
        //   "read",
        //   params2,
        //   async (err2, value2) => {
        //     if (err2) return console.log("ERROR:", err2);

        //     result = value2;
        //   }
        // );

        // result = value;
        // let resultPublished = [];

        // return res.json(result);

        //

        // result.forEach((post) => {
        //   if (post.is_published == true) resultPublished.push(post);
        // });
      }
    );
  });
}
