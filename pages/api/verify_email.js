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

  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["x_studio_status_verify_code_1", "=", String(q?.hash)]]);
    inParams.push(["id", "x_studio_status_verify_1"]); //fields

    var params = [];
    params.push(inParams);
    odoo.execute_kw("crm.lead", "search_read", params, function (err, value) {
      if (err) {
        return console.log(err);
      }

      if (value) {
        // console.log(value[0]?.x_studio_status_verify_1)
        // if (Number(value[0]?.x_studio_status_verify_1) >= 3)
        //   return res.json({
        //     result: false,
        //   });

        odoo.connect(function (err2) {
          if (err2) {
            return console.log(err2);
          }

          var inParams2 = [];
          inParams2.push([Number(value[0]?.id)]); //id to update
          inParams2.push({
            x_studio_status_verify_1: String(3),
          });
          var params2 = [];
          params2.push(inParams2);
          odoo.execute_kw(
            "crm.lead",
            "write",
            params2,
            function (err2, value2) {
              if (err2) {
                return console.log(err2);
              }

              return res.json({
                result: true,
              });
            }
          );
        });
      } else {
        return res.json({ result: false });
      }
      // return res.json({
      //   result: value,
      // });
      console.log("Result: ", value);
    });
  });

  //   odoo.connect(function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }

  //     var inParams = [];
  //     inParams.push([Number(q?.crm_id)]); //id to update
  //     inParams.push({
  //       x_studio_status_verify_1: String(2),
  //       x_studio_status_verify_code_1: String(hash),
  //     });
  //     var params = [];
  //     params.push(inParams);
  //     odoo.execute_kw("crm.lead", "search_read", params, function (err, value) {
  //       if (err) {
  //         return console.log(err);
  //       }

  //       return res.json({
  //         result: true,
  //       });
  //     });
  //   });
}
