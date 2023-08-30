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
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  // const query = req.body;
  const query = JSON.parse(JSON.stringify(req.body));

  console.log("QUERY RECIBIDA POR POST", query);
  return res.json({
    query: query,
  });
  // const client = await clientPromise;
  // const db = client.db("users_reviews");
  // const getconfig = await db.collection("config").find({}).toArray();
  // const googleConfig = getconfig[1];
  // const googleContactConfig = getconfig[2];

  // const credentials = googleConfig?.googleCredentials;
  // const token = googleContactConfig?.googleContactToken;

  // const resfindContacts = await fetch(
  //   "https://review.305tax.com/api/contact/listGoogleContacts",
  //   {
  //     method: "GET",
  //   }
  // );

  // const findContacts = await resfindContacts.json();

  // const newContact = {
  //   givenName: String(query?.displayname),
  //   email: String(query?.email),
  //   mobile: String(query?.phonenumber),
  // };

  // if (Object.values(newContact).includes("undefined"))
  //   return res.status(502).json({
  //     status: false,
  //     statusText: "undefined values",
  //   });

  // var existContact = Array.from(findContacts).find(
  //   (fc) => String(fc?.phoneNumbers[0]?.value) == String(newContact.mobile)
  // );

  // async function loadSavedCredentialsIfExist() {
  //   try {
  //     const credentials = token;
  //     return google.auth.fromJSON(credentials);
  //   } catch (err) {
  //     return null;
  //   }
  // }

  // async function authorize() {
  //   let client = await loadSavedCredentialsIfExist();

  //   if (client) return client;
  //   return client;
  // }

  // async function createGoogleContact(auth, newContact) {
  //   const service = google.people({ version: "v1", auth });

  //   service.people
  //     .createContact({
  //       resource: {
  //         names: {
  //           givenName: String(newContact?.givenName),
  //         },
  //         emailAddresses: {
  //           value: String(newContact?.email),
  //           type: "home",
  //         },
  //         phoneNumbers: [
  //           {
  //             value: String(newContact?.mobile),
  //             type: "home",
  //           },
  //         ],
  //       },
  //     })
  //     .then((result) => {
  //       return res.json({
  //         state: true,
  //         result: result.data,
  //       });
  //     })
  //     .catch((error) => console.log("ERROR CREATE CONTACT", error));
  // }

  // if (existContact == undefined) {
  //   const response = await authorize()
  //     .then((client) => createGoogleContact(client, newContact))
  //     .catch(console.error);
  // } else {
  //   return res.json({
  //     result: "User found.",
  //   });
  // }

  // async function authorize() {
  //   let client = await loadSavedCredentialsIfExist();

  //   if (client) return client;
  //   return client;
  // }
  // const newContact = {
  //   givenName: String(query?.displayname),
  //   email: String(query?.email),
  //   mobile: String(query?.phonenumber),
  // };

  // async function createGoogleContact(auth, newContact) {
  //   const service = google.people({ version: "v1", auth });

  //   service.people
  //     .createContact({
  //       resource: {
  //         names: {
  //           givenName: String(newContact?.givenName),
  //         },
  //         emailAddresses: {
  //           value: String(newContact?.email),
  //           type: "home",
  //         },
  //         phoneNumbers: [
  //           {
  //             value: String(newContact?.mobile),
  //             type: "home",
  //           },
  //         ],
  //       },
  //     })
  //     .then((result) => {
  //       return res.json({
  //         state: true,
  //         result: result.data,
  //       });
  //     })
  //     .catch((error) => console.log("ERROR CREATE CONTACT", error));
  // }

  // const response = await authorize()
  //   .then((client) => createGoogleContact(client, newContact))
  //   .catch(console.error);
}
