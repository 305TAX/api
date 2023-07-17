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
  } else if (req.method === "POST") {
    try {
      // Read the existing data from the JSON file
      const jsonData = await fsPromises.readFile(dataFilePath);
      const objectData = JSON.parse(jsonData);

      // Get the data from the request body
      const { msgdf } = req.query;

      // Add the new data to the object
      const newData = {
        messageDefault: msgdf,
      };

      // Convert the object back to a JSON string
      const updatedData = JSON.stringify(newData);

      // Write the updated data to the JSON file
      await fsPromises.writeFile(dataFilePath, updatedData);

      // Send a success response
      res.status(200).json({ message: "Data stored successfully" });
    } catch (error) {
      console.error(error);
      // Send an error response
      res.status(500).json({ message: "Error storing data" });
    }
  }
}
