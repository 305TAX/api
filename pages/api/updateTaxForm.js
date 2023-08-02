import clientPromise from "../../lib/mongodb";
import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { notCrmId, bdid, info_lead, crm_id, form_modify, form_our } =
    JSON.parse(req.body);

  try {
    const client = await clientPromise;
    const db = client.db("users_reviews");

    if (notCrmId == true) {
      const response = await db.collection("forms_tax").insertOne({
        info_lead: info_lead,
        form_modify: form_modify,
        form_our: form_our,
      });
      return res.json({
        result: true,
      });
    } else {
      const ubid = ObjectId(bdid);
      const response = await db.collection("forms_tax").updateOne(
        { _id: ubid },
        {
          $set: {
            "info_lead.update_time": new Date(),
            form_modify: form_modify,
            form_our: form_our,
          },
        }
      );
      return res.json({
        result: true,
      });
    }

    // if (response) {
    //   return true;
    // }
  } catch (error) {
    console.log("ERRO MONGODB", error);
  }
}
