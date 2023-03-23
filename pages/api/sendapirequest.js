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

  const responseQuery = req.query;
  responseQuery.id = Number(String(responseQuery.id).replace(/,/g, ""));

  let result;
  let resultResponse;

  let odoo = new Odoo({
    url: "https://305tax.odoo.com",
    db: "305tax",
    username: "joalexint@gmail.com",
    password: "17569323Jouu1n*",
  });

  const generateRandomString = (num) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result1 = " ";

    const charactersLength = characters.length;

    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return result1;
  };

  const dateServer = new Date();

  const odooSearch2 = (tempRating) => {
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
      odoo.execute_kw("helpdesk.ticket", "search", params, (err, value) => {
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
          "use_rating",
          "rating_count",
          "rating_avg_text",
          "active",
          "partner_name",
        ]);

        let params = [];
        params.push(inParams);

        odoo.execute_kw("helpdesk.ticket", "read", params, (err2, value2) => {
          if (err2) return console.log("ERROR:", err2);

          let resultRead = value2;

          resultRead.forEach((review) => {
            if (review.id == tempRating.res_id) {
              let urlRedirect = `https://review.305tax.com/api/review_redirect?i=${
                tempRating.res_id
              }&a=${tempRating.access_token}&cpid=res.partner(${
                review.commercial_partner_id[0]
              },)&d=${encodeURI(tempRating.display_name)}&partner=${encodeURI(
                String(tempRating.partner_id[1]).trim()
              )}`;

              return res.send(urlRedirect);
              // return res.json({
              //   result: "LOGRADOOOOOOOOOOOO",
              //   review: review,
              // });
            }
          });
        });
      });
    });
  };

  const odooSearch = (idReview) => {
    try {
      odoo.connect((err) => {
        if (err) {
          return console.log(err);
        }
        console.log("Connected to Odoo server.");
        var inParams = [];
        inParams.push([]);
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

        odoo.execute_kw("rating.rating", "search", params, (err, value) => {
          if (err) return console.log("ERROR:", err);

          let inParams = [];
          inParams.push(value); //ids
          inParams.push([
            "display_name",
            "access_token",
            "id",
            "res_id",
            "partner_id",
            "parent_ref",
            "parent_res_id",
            "rated_partner_id",
          ]);

          let params = [];
          params.push(inParams);

          odoo.execute_kw(
            "rating.rating",
            "read",
            params,
            async (err2, value2) => {
              if (err2) return console.log("ERROR:", err2);

              let resultRead = value2;
              let tempRating;

              resultRead.flr;
              // let tempReview;

              resultRead.forEach((review) => {
                if (Number(idReview) == review.res_id) {
                  tempRating = review;
                }
              });

              //https://review.305tax.com/api/review_redirect?i=106&a=f765a28c1bbe4937a5551c437413343b&cpid=res.partner(1601,)&d=POQDenMM-Thu%20Mar%2023%202023&partner=1602,%20Joalex%20Urdaneta
              //https://review.305tax.com/api/review_redirect?i=106&a=f765a28c1bbe4937a5551c437413343b&cpid=res.partner(1601,)&d=POQDenMM-Thu%20Mar%2023%202023&partner=Joalex%20Urdaneta

              if (!tempRating)
                return res.status(400).json({
                  response: false,
                  reason: "Not found",
                });

              tempRating.partner_id[1] = String(tempRating.partner_id[1]).split(
                ","
              )[1];
              9;
              tempRating.display_name = String(tempRating.display_name).replace(
                /\s*\(.*?\)\s*/g,
                ""
              );

              return odooSearch2(tempRating);

              // //https://review.305tax.com/api/review_redirect?i=93&a=dab7379d98e5448c817ed647be58114f&cpid=res.partner(1602,)&d=m2lfq4Hx-Wed%20Mar%2022%202023&partner=Joalex%20Urdaneta
              // //https://review.305tax.com/api/review_redirect?i=93&a=dab7379d98e5448c817ed647be58114f&cpid=res.partner(1601,)&d=m2lfq4Hx-Wed%20Mar%2022%202023&partner=Joalex%20Urdaneta

              // // result = value2;
              // //https://review.305tax.com/api/review_redirect?i=85&a=58bdbd3ee5224df99c241d3352b92902&cpid=res.partner(1601,)&d=ohByXkAO-Wed%20Mar%2022%202023&partner=Joalex%20Urdaneta
              // let urlRedirect = `https://review.305tax.com/api/review_redirect?i=${
              //   tempRating.res_id
              // }&a=${tempRating.access_token}&cpid=res.partner(${
              //   tempRating.partner_id[0]
              // },)&d=${encodeURI(tempRating.display_name)}&partner=${encodeURI(
              //   String(tempRating.partner_id).trim()
              // )}`;
              // return res.json({
              //   result: tempRating,
              // });
            }
          );
        });
      });
    } catch (error) {
      return res.json({
        result: error,
      });
    }

    // return res.json({
    //   result: idReview,
    // });
  };

  try {
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

      odoo.connect(function (err) {
        if (err) {
          return console.log(err);
        }

        let nameVal = generateRandomString(8) + "-" + dateServer.toDateString();
        nameVal = String(nameVal).trim();

        var inParams = [];
        inParams.push({
          name: nameVal,
          stage_id: 4,
          partner_id: responseQuery.id,
        });
        var params = [];
        params.push(inParams);
        odoo.execute_kw(
          "helpdesk.ticket",
          "create",
          params,
          function (err, value) {
            if (err) {
              return console.log(err);
            }
            console.log("Result CREATON >>>>>: ", value);
            return odooSearch(value);
            // return res.json({
            //   response: true,
            //   result: value,
            // });
          }
        );
      });
    });
  } catch (error) {
    return res.json({
      result: error,
    });
  }
}
