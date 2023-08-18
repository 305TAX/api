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

  const client = await clientPromise;
  const db = client.db("users_reviews");
  const getconfig = await db.collection("config").find({}).toArray();
  const googleConfig = getconfig[1];
  const googleContactConfig = getconfig[2];

  const credentials = googleConfig?.googleCredentials;
  const token = googleContactConfig?.googleContactToken;

  const resfindContacts = await fetch(
    "http://localhost:3001/api/contact/listGoogleContacts",
    {
      method: "GET",
    }
  );

  const query = req.body;

  console.log("query", query);

  const findContacts = await resfindContacts.json();

  const sinConocimientoDelContacto = [
    "+56 9 8419 1302",
    "+1 954-471-4195",
    "+1 786-236-5895",
    "+1 786-306-8752",
  ];

  const noCreado = ["+1 770-203-3735", "+1 713-961-0262", "+1769289020"];

  const pruebaNum = ["+1 786-724-5661"];

  async function iterateArrayWithPromises(array) {
    const promises = array.map((item) => item.promise);
    await Promise.all(promises);
    for (const item of array) {
      console.log(item);
    }
  }

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

  async function updateGoogleContact(auth, estContact, infoContact) {
    const service = google.people({ version: "v1", auth });

    const res = await service.people.updateContact(
      {
        resourceName: String(estContact?.resourceName), //"people/c4328366331976477502"
        personFields: "names,phoneNumbers",
        updatePersonFields: "names,phoneNumbers",
        resource: {
          // Person.metadata.sources.etag
          etag: String(estContact?.etag), //"%EgUBAi43PRoEAQIFByIMMVRobi9zZ29IY2M9"

          names: {
            givenName: String(infoContact?.nameReal.firstName),
            familyName: String(infoContact?.nameReal.lastName),
          },
          phoneNumbers: [
            {
              value: String(infoContact?.number),
              type: "home",
            },
          ],
        },
      })
    
    const conc = await res;

    if (conc?.status == "200") {
      return true;
    } else {
      return false
    }
    
    // ,
    //   (err, res) => {
    //     if (err) {
    //       console.log("The API returned an error: " + err);
    //     } else {
    //       console.log("Contact updated: " + res);
    //       return true;
    //     }
    //   }
    // );
    // service.people
    //   .createContact({
    //     resource: {
    //       names: {
    //         givenName: String(newContact?.givenName),
    //       },
    //       emailAddresses: {
    //         value: String(newContact?.email),
    //         type: "home",
    //       },
    //       phoneNumbers: [
    //         {
    //           value: String(newContact?.mobile),
    //           type: "home",
    //         },
    //       ],
    //     },
    //   })
    //   .then((result) => {
    //     return res.json({
    //       state: true,
    //       result: result.data,
    //     });
    //   })
    //   .catch((error) => console.log("ERROR CREATE CONTACT", error));
  }

  const changeContacts = [
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+58 424-4664640",
          nameReal: {
            firstName: "ADRIANA",
            lastName: "GONZALEZ BENITEZ",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+1 786-953-2670",
          nameReal: {
            firstName: "CARLA",
            lastName: "MEJICANO PEREZ",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+52 55 3555 9160",
          nameReal: {
            firstName: "CALEB",
            lastName: "CHINAS REYES",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+58 414-4346274",
          nameReal: {
            firstName: "EMILIO",
            lastName: "FERNANDEZ",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+1 786-513-4188",
          nameReal: {
            firstName: "MARY",
            lastName: "GABRIELA OJEDA",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+58 414-3596665",
          nameReal: {
            firstName: "MAURIZIO",
            lastName: "DELLI COLLI",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+1 514-638-2311",
          nameReal: {
            firstName: "GISEL",
            lastName: "REYES",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+1 416-836-6573",
          nameReal: {
            firstName: "MARYANT",
            lastName: "PEREZ CHACON",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },
    {
      promise: new Promise(async (resolve, reject) => {
        let infoContact = {
          number: "+57 317 3314256",
          nameReal: {
            firstName: "OTILIA",
            lastName: "DELGADO ANAYA",
          },
        };

        let estContact = Array.from(findContacts).filter(
          (fc) =>
            String(fc?.phoneNumbers[0]?.value) == String(infoContact?.number)
        );

        const response = await authorize()
          .then((client) =>
            updateGoogleContact(client, estContact[0], infoContact)
          )
          .catch(console.error);

        if (response) {
          console.log("RESPONSE RESULT", response);
          resolve(
            `${estContact[0]?.names[0]?.displayName} / ${estContact[0]?.resourceName}`
          );
        }
      }),
    },

    // {
    //   number: "",
    //   nameReal: "",
    // },
  ];

  // const myPromise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("foo");
  //   }, 3000);
  // });

  await iterateArrayWithPromises(changeContacts);
  // const lks = changeContacts?.forEach(async (chc, index) => {

  //   const response = await myPromise.then(result => result).catch(err => err);

  //   console.log(`${index+1}. ${chc?.nameReal} transforma a: `, response)

  // })

  // findContacts?.map((fd) => console.log(fd?.phoneNumbers[0]?.value))
  var existContact = Array.from(findContacts).filter(
    (fc) => String(fc?.phoneNumbers[0]?.value) == String(query?.num)
  );

  return res.json({
    length: existContact,
  });

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

  // const response =
}
