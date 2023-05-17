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

  const p = req.query;

  //   const post_query = req.query;
  //   post_query.q = decodeURI(post_query.q);
  //   post_query.q = String(capitalized(String(post_query.q))).trim();

  let result;

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["x_studio_show", "=", true]]);

    inParams.push([]);
    var params = [];
    params.push(inParams);

    if (p.name) {
      odoo.execute_kw("x_services", "search_read", params, (err, value) => {
        if (err) return console.log("ERROR:", err);

        if (value.length < 1) return res.json([]);

        let searchService = "";
        let theService = {};
        value.forEach((service) => {
          if (
            String(service.x_name).replace(/\ /g, "-").toLowerCase() == p.name
          ) {
            theService = service;
            searchService = service.x_studio_associated_page[0];
          }
        });

        console.log("search service: ", searchService);

        if (!searchService) return res.json([]);
        console.log("fase 1 superada");

        let inParams2 = [];
        inParams2.push([["id", "=", Number(searchService)]]);

        let params2 = [];
        params2.push(inParams2);

        odoo.execute_kw(
          "website.page",
          "search_read",
          params2,
          async (err2, value2) => {
            if (err2) return console.log("ERROR:", err2);

            //x_services_line_96e9a
            let inParams3 = [];
            inParams3.push([["x_services_id", "=", theService.id]]);

            let params3 = [];
            params3.push(inParams3);

            console.log("fase 2 superada");

            odoo.execute_kw(
              "x_services_line_96e9a",
              "search_read",
              params3,
              async (err3, value3) => {
                if (err3) return console.log("ERROR:", err3);

                const blogRel = [];

                if (theService.x_studio_related_posts != false) {
                  await theService.x_studio_related_posts.forEach(
                    async (element) => {
                      let inParams4 = [];
                      inParams4.push([["id", "=", element]]);

                      let params4 = [];
                      params4.push(inParams4);
                      console.log("ejecutado");
                      odoo.execute_kw(
                        "blog.post",
                        "search_read",
                        params4,
                        async (err4, value4) => {
                          if (err4) return console.log("ERROR:", err4);
                          blogRel.push(value4[0]);
                          console.log("ejecutado 2", value4[0]);
                          console.log("fase 3 superada");
                          if (
                            blogRel.length >=
                            theService.x_studio_related_posts.length
                          ) {
                            return res.json({
                              service: theService,
                              website_page: value2[0],
                              faq: value3,
                              blogs: blogRel,
                            });
                          }
                        }
                      );
                    }
                  );
                }

                return res.json({
                  service: theService,
                  website_page: value2[0],
                  faq: value3,
                  blogs: blogRel,
                });

                // const blogRel = [];

                // await value[0].x_related_posts.forEach(async (element) => {
                //   let inParams4 = [];
                //   inParams4.push([["id", "=", element]]);

                //   let params4 = [];
                //   params4.push(inParams4);

                //   odoo.execute_kw(
                //     "blog.post",
                //     "search_read",
                //     params4,
                //     async (err4, value4) => {
                //       if (err4) return console.log("ERROR:", err4);
                //       blogRel.push(element);
                //     }
                //   );
                // });

                // result = value2[0];
                // return res.json({
                //   result: result,
                //   page: value[0],
                //   page_steps: value3,
                //   blog_rel: blogRel,
                // });

                //return res.json(value3);
              }
            );
          }
        );
      });
    } else {
      odoo.execute_kw("x_services", "search_read", params, (err, value) => {
        if (err) return console.log("ERROR:", err);

        if (value.length < 1) return res.json([]);

        return res.json(value);
      });
    }

    // 4- Read
  });
}
