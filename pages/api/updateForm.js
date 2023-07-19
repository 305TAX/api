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

  const { crm_id, form_modify, form_our } = JSON.parse(req.body);

  try {
    // return res.json({
    //   form_modify: form_modify,
    //   form_our: form_our,
    // });
    const client = await clientPromise;
    const db = client.db("users_reviews");

    const response = await db
      .collection("forms")
      .updateOne(
        { "info_lead.crm_id": crm_id },
        {
          $set: {
            "info_lead.update_time": new Date(),
            form_modify: form_modify,
            form_our: form_our,
          },
        }
      );
    console.log(response, crm_id, form_modify, form_our);
    // if (response) {
    //   return true;
    // }
  } catch (error) {
    console.log("ERRO MONGODB", error);
  }
}
