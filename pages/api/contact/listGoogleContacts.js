import clientPromise from "../../../lib/mongodb";
// import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
// import { odooConfig } from "../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const SCOPES = ["https://www.googleapis.com/auth/contacts"];

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const client = await clientPromise;
  const db = client.db("users_reviews");

  const query = req.query;
  let isFragmentExist =
    Object.keys(query).filter((fs) => String(fs) === "fragment").length >= 1
      ? true
      : false;

  const getConfigMongoDB = new Promise(async (resolve, reject) => {
    try {
      const resConfig = await db.collection("config").find({}).toArray();
      const resTokens = await db.collection("tokens").find({}).toArray();

      let config = {
        credentials: resConfig,
        tokens: resTokens,
      };

      resolve(config);
    } catch (error) {
      reject(error);
    }
  });

  const config = await getConfigMongoDB;

  const credentials = config.credentials[1]?.googleCredentials;

  const token = !isFragmentExist
    ? config.tokens[0]?.googleContact305TAXToken
    : config.tokens[1]?.googleContactROSAToken;

  async function loadSavedCredentialsIfExist() {
    try {
      const credentials = token;
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  async function authorize() {
    let client = await loadSavedCredentialsIfExist();

    if (client) return client;
    return client;
  }

  async function listConnectionNames(auth) {
    const service = google.people({ version: "v1", auth });

    const res = await service.people.connections.list({
      resourceName: "people/me",
      pageSize: 200,
      personFields: "names,emailAddresses,phoneNumbers",
    });

    const connections = res.data.connections;

    if (!connections || connections.length === 0 || connections == undefined)
      return {
        status: 401,
        statusText: "GOOGLE CONTACTS: No connections found.",
      };

    return connections;
  }

  const response = await authorize()
    .then(listConnectionNames)
    .catch(console.error);

  return res.json(response);
}
