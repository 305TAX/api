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

  const responseQuery = req.query;
  responseQuery.id = Number(String(responseQuery.id).replace(/,/g, ""));

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

      var inParams = [];
      inParams.push({
        name: generateRandomString(8) + "-" + dateServer.toDateString(),
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
          return res.json({
            response: true,
            result: value,
          });
        }
      );
    });

    // odoo.connect(function (err) {
    //   if (err) {
    //     return console.log(err);
    //   }

    //   var inParams = [];
    //   inParams.push([8]); //id to delete
    //   var params = [];
    //   params.push(inParams);
    //   odoo.execute_kw(
    //     "helpdesk.ticket",
    //     "unlink",
    //     params,
    //     function (err, value) {
    //       if (err) {
    //         return console.log(err);
    //       }
    //       console.log("Result: ", value);
    //       return res.json({
    //         result: value,
    //       });
    //     }
    //   );
    // });

    // 4- Read
    // odoo.execute_kw("helpdesk.ticket", "search", params, (err, value) => {
    //   if (err) return console.log("ERROR:", err);

    //   let inParams = [];
    //   inParams.push(value); //ids
    //   inParams.push([
    //     "name",
    //     "company_id",
    //     "email",
    //     "domain_user_ids",
    //     "commercial_partner_id",
    //     "kanban_state",
    //     "stage_id",
    //     "access_token",
    //     "use_rating",
    //     "rating_count",
    //     "rating_avg_text",
    //     "active",
    //   ]);

    //   let params = [];
    //   params.push(inParams);

    //   odoo.execute_kw(
    //     "helpdesk.ticket",
    //     "read",
    //     params,
    //     async (err2, value2) => {
    //       if (err2) return console.log("ERROR:", err2);

    //       result = value2;

    //       try {
    //         result.forEach(async (review) => {
    //           if (Number(reviewArray.i) - 2 == review.id) {
    //             tempReview = review;
    //           }
    //         });

    //         if (!tempReview)
    //           return res.status(400).json({
    //             response: false,
    //             reason: "Not found",
    //           });

    //         if (reviewArray.d != tempReview.name)
    //           return res.status(400).json({ response: false, reason: "ERR 1" });

    //         if (reviewArray.cpid != tempReview.commercial_partner_id[0])
    //           return res.status(400).json({ response: false, reason: "ERR 2" });

    //         if (tempReview.rating_avg_text == "none")
    //           return res.redirect("https://305tax.com");

    //         try {
    //           const client = await clientPromise;
    //           const db = client.db("users_reviews");
    //           const response = await db
    //             .collection("users")
    //             .findOne({ id: tempReview.id });

    //           let redirectURL =
    //             "https://305tax.odoo.com/rate/" + reviewArray.a + "/5";

    //           if (response) {
    //             if (response.rating_avg_text == "top")
    //               return res.redirect("https://305tax.com/");

    //             return res.redirect(redirectURL);
    //           } else {
    //             await db.collection("users").insertOne(tempReview);

    //             if (tempReview.rating_avg_text == "top")
    //               return res.redirect("https://305tax.com/");

    //             return res.redirect(redirectURL);
    //           }
    //         } catch (error) {
    //           return res.status(400).json({
    //             response: false,
    //             reason: "Bad Request",
    //           });
    //         }
    //       } catch (error) {
    //         return res.status(400).json({
    //           response: false,
    //           reason: "Bad Request",
    //         });
    //       }
    //     }
    //   );
    // });
  });

  return res.json({
    result: "R-" + "16-" + dateServer.toDateString(),
  });
}
