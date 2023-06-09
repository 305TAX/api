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

  const q = JSON.parse(req.body);

  try {
    const client = await clientPromise;
    const db = client.db("users_reviews");

    const response = await db.collection("users").insertOne(q);

    if (response) {
      return res.json({
        result: true,
      });
    } else {
      return res.json({
        result: false,
        error: "001",
      });
    }
  } catch (error) {
    return res.json({
      result: false,
      error: error,
    });
  }

  // const responseQuery = JSON.parse(req.body);
  // const responseId = req.query;

  // const generateRandomString = (num) => {
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //   let result1 = " ";

  //   const charactersLength = characters.length;

  //   for (let i = 0; i < num; i++) {
  //     result1 += characters.charAt(
  //       Math.floor(Math.random() * charactersLength)
  //     );
  //   }

  //   return result1;
  // };

  // const dateServer = new Date();

  // try {
  //
  //
  //   const response = await db
  //     .collection("users")
  //     .updateOne(
  //       { web_access_token: responseId.a },
  //       {
  //         $set: {
  //           web_feedback: responseQuery.feedback,
  //           web_points: responseQuery,
  //         },
  //       }
  //     );

  //   return res.send(true);
  // } catch (error) {
  //   return res.send(false);
  // }

  // odoo.connect((err) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Connected to Odoo server.");
  //   var inParams = [];
  //   inParams.push([["active", "=", true]]);
  //   var params = [];
  //   params.push(inParams);

  //   // 1- Login
  //   odoo.connect(function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log("Connected to Odoo server.");
  //   });

  // odoo.connect(function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   let nameVal = generateRandomString(8) + "-" + dateServer.toDateString();
  //   nameVal = String(nameVal).trim();

  //   var inParams = [];
  //   inParams.push({
  //     name: nameVal,
  //     stage_id: 4,
  //     partner_id: responseQuery.id,
  //   });
  //   var params = [];
  //   params.push(inParams);
  //   odoo.execute_kw(
  //     "helpdesk.ticket",
  //     "create",
  //     params,
  //     function (err, value) {
  //       if (err) {
  //         return console.log(err);
  //       }
  //       console.log("Result CREATON >>>>>: ", value);
  //       return res.json({
  //         response: true,
  //         result: value,
  //       });
  //     }
  //   );
  // });

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

  // odoo.connect(function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   var inParams = [];
  //   inParams.push([30]); //id to update
  //   inParams.push({
  //     rating_text: "ok",
  //   });
  //   var params = [];
  //   params.push(inParams);
  //   odoo.execute_kw("rating.rating", "write", params, function (err, value) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log("Result: ", value);
  //   });
  // });

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
  //     "partner_name",
  //   ]);

  //   let params = [];
  //   params.push(inParams);

  //   odoo.execute_kw(
  //     "helpdesk.ticket",
  //     "read",
  //     params,
  //     async (err2, value2) => {
  //       if (err2) return console.log("ERROR:", err2);

  //       //result = value2;
  //       console.log("Reesult", value2);
  //     }
  //   );
  // });
  // });
}
