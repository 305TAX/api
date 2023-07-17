//import clientPromise from "../../lib/mongodb";
import fsPromises from "fs/promises";
import path from "path";

import NextCors from "nextjs-cors";
import { useRouter } from "next/router";
import { useEffect } from "react";

const dataFilePath = path.join(process.cwd(), "/pages/api/dfwamessage.json");

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === "GET") {
    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    res.status(200).json({
      result: objectData,
    });
  }
}
