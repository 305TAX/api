// import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";
import NextCors from "nextjs-cors";
import unirest from "unirest";
import { odooConfig } from "../../lib/odooConfig";
import cheerio from "cheerio";
import imageToBase64 from "image-to-base64";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let odoo = new Odoo(odooConfig);

  const query = req.body;

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }

    var inParams = [];
    inParams.push({
      x_name: query?.name,
      x_studio_description: query?.description,
      x_studio_video_id: query?.video_id,
      x_studio_video_url: query?.video_url,
      x_studio_published_date: query?.published_date,
      x_studio_video_length: query?.video_length,
    });
    var params = [];
    params.push(inParams);

    // 4- Read
    odoo.execute_kw("x_videos", "create", params, async (err, value) => {
      if (err) return console.log("ERROR:", err);

      return res.json({
        result: value,
      });
    });
  });
}
