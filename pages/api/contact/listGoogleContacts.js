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
  const getconfig = await db.collection("config").find({}).toArray();
  const googleConfig = getconfig[1];
  const googleContactConfig = getconfig[2];

  const credentials = googleConfig?.googleCredentials;
  const token = googleContactConfig?.googleContactToken;

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
    console.log("LENGTH", connections.length)
    if (!connections || connections.length === 0)
      return res.json({
        status: 401,
        statusText: "GOOGLE CONTACTS: No connections found.",
      });

    return connections;
  }

  const response = await authorize()
    .then(listConnectionNames)
    .catch(console.error);

  return res.json(response);
}
