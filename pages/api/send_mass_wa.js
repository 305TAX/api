//import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";

import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  //ODOO CONFIGURATION
  let odoo = new Odoo(odooConfig);

  /** VARIABLES */
  const currentYear = new Date().getFullYear();
  const qbody = JSON.parse(req.body);
  //const qbody = req.body;

  const newArray = [];
  String(qbody.res_ids)
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map((obj) => {
      const newValue = Number(String(obj).trim());
      newArray.push(newValue);
    });

  let i = 0;
  const res_ids = [];

  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  async function replaceUrlsAndShorten(text) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    let newText = text;
    var match = "";
    while ((match = urlRegex.exec(text)) !== null) {
      try {
        let url = String(match[0]);
        const response = await fetch("https://review.305tax.com/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        })
          .then((res) => res.json())
          .then((result) => {
            newText = newText.replace(
              match,
              `https://305tax.com/l/${result.key}`
            );
          });
      } catch (error) {
        console.log("Error", error);
      }
    }
    return newText;
  }

  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");

    const inParams = [];

    inParams.push([]);
    inParams.push(["id", "name", "mobile", "email"]); //fields

    const params = [];
    params.push(inParams);

    odoo.execute_kw(
      "res.partner",
      "search_read",
      params,
      async function (err, value) {
        if (err) {
          return console.log(err);
        }

        const result = value;
        result.forEach((val, index) => {
          const findd = newArray.find((obj) => obj == Number(val.id));
          if (findd != undefined) {
            res_ids.push(val);
          }
        });

        const forLoop = async () => {
          console.log("Start");

          for (let index = 0; index < res_ids.length; index++) {
            const rm = res_ids[index];

            let fmessage = "";

            let modifyMessage = await replaceUrlsAndShorten(qbody.msg);

            if (qbody?.rc) {
              fmessage =
                "https://5364-206-1-164-185.ngrok-free.app/chat/sendmessage/" +
                String(rm.mobile)
                  .replace(" ", "")
                  .replace("+", "")
                  .replace("-", "")
                  .replace("-", "") +
                "?m=Hola%20" +
                String(rm.name).split(" ")[0] +
                ".%0A%0A" +
                encodeURIComponent(modifyMessage);
            } else {
              fmessage =
                "https://5364-206-1-164-185.ngrok-free.app/chat/sendmessage/" +
                String(rm.mobile)
                  .replace(" ", "")
                  .replace("+", "")
                  .replace("-", "")
                  .replace("-", "") +
                "?m=Hola%20" +
                String(rm.name).split(" ")[0] +
                ".%0A%0A" +
                encodeURIComponent(modifyMessage) +
                "%0A%0Ahttps%3A%2F%2Freview.305tax.com%2Freview%2F" +
                String(rm.id) +
                "%0A%0ACordiales%20Saludos.";
            }

            const fetched = await fetch(fmessage, {
              method: "POST",
            });
            const resultFetched = await fetched.json();
            console.log("resulto");
          }
          console.log("log interno", qbody);
          return res.json({
            current: true,
          });
        };
        forLoop();
      }
    );
  });

  // console.log("El resultado es", qbody);

  // (function myLoop(i) {
  //   setTimeout(function () {

  //     // console.log(Result, resultFetched);
  //     console.log("result", i);

  //     if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
  //   }, 3000);
  // })(res_ids.length);
}
