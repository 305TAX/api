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

  //FUNCTION
  odoo.connect((err) => {
    if (err) {
      console.log("ERROR", err);
      return res.json({
        error: err,
      });
    }

    let inParams = [];
    inParams.push([["x_studio_show", "=", true]]);
    inParams.push([
      "display_name",
      "x_name",
      "id",
      "x_studio_icon",
      "x_studio_translate_to_spanish",
      "x_studio_associated_page",
      "x_studio_service_appointment",
      "x_studio_description",
    ]);

    let params = [];
    params.push(inParams);

    if (p.name) {
      odoo.execute_kw("x_services", "search_read", params, (err, value) => {
        if (err) {
          console.log("ERROR", err);
          return res.json({
            error: err,
          });
        }

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

        if (!searchService) return res.json([]);

        let inParams2 = [];
        inParams2.push([["id", "=", Number(searchService)]]);

        let params2 = [];
        params2.push(inParams2);

        odoo.execute_kw(
          "website.page",
          "search_read",
          params2,
          async (err2, value2) => {
            if (err2) {
              console.log("ERROR", err2);
              return res.json({
                error: err2,
              });
            }

            let inParams3 = [];
            inParams3.push([["x_services_id", "=", theService.id]]);

            let params3 = [];
            params3.push(inParams3);

            odoo.execute_kw(
              "x_services_line_96e9a",
              "search_read",
              params3,
              async (err3, value3) => {
                if (err3) return console.log("ERROR:", err3);

                return res.json({
                  service: theService,
                  website_page: value2[0],
                  faq: value3,
                });
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
  });
}
