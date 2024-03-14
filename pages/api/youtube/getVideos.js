import Odoo from "odoo-xmlrpc";
import { odooConfig } from "../../../lib/odooConfig";
import NextCors from "nextjs-cors";
import ytch from "yt-channel-info";

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const payload = {
    channelId: "UCUFkqYAOcbPkUwg-KIKEDmg", // Required

    sortBy: "newest",
    channelIdType: 0,
  };

  return res.status(200).json({ items: [] });
}
