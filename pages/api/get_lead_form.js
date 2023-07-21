import clientPromise from "../../lib/mongodb";
import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const q = req.query;

  let odoo = new Odoo(odooConfig);

  try {
    const client = await clientPromise;
    const db = client.db("users_reviews");

    const response = await db.collection("forms").find({}).toArray();

    const findResponse = response?.filter(
      (user) => user.info_lead.odoo_id == q?.id
    )[0];
    console.log("response api", findResponse);

    if (findResponse == undefined) {
      return res.json({
        result: false,
      });
    } else {
      return res.json(
        response?.filter((user) => user.info_lead.odoo_id == q?.id)[0]
      );
    }

    // if (response) {
    //   const findUser = response.result;
    //   // const result = findUser.find(
    //   //   (user, index) => user.info_lead.odoo_id == q?.id
    //   // );

    //   return res.json({
    //     result: findUser,
    //   });
  } catch (error) {
    return res.json({
      result: false,
      error: error,
    });
  }
}
