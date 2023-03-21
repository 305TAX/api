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

  const reviewArray = req.query;
  let tempReview;

  const client = await clientPromise;
  const db = client.db("users_reviews");
  const response = await db
    .collection("users")
    .findOne({ web_access_token: reviewArray.a });

  let redirectURL = "https://305tax.odoo.com/rate/" + reviewArray.a + "/5";

  if (!response) return res.redirect("https://305tax.com/");

  if (response?.web_feedback) return res.send(false);
  return res.send(true);

  // if (response) {
  //   if (response.rating_avg_text == "top")
  //     return

  //   return res.redirect(redirectURL);
  // } else {
  //   tempReview.web = {
  //     access_token: reviewArray.a,
  //   };
  //   await db.collection("users").insertOne(tempReview);

  //   if (tempReview.rating_avg_text == "top")
  //     return res.redirect("https://305tax.com/");

  //   return res.redirect(redirectURL);
  // }
}
