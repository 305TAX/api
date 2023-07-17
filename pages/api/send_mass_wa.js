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
  // const qbody = req.body;

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

  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");

    const inParams = [];

    inParams.push([]);
    inParams.push(["id", "name", "mobile"]); //fields

    const params = [];
    params.push(inParams);

    odoo.execute_kw(
      "res.partner",
      "search_read",
      params,
      function (err, value) {
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
        console.log(res_ids);
      }
    );
  });

  // console.log("El resultado es", qbody);

  const looping = async () => {
    setTimeout(async () => {
      try {
        const rm = res_ids[i];
        let fmessage =
          "https://5364-206-1-164-185.ngrok-free.app/chat/sendmessage/" +
          String(rm.mobile)
            .replace(" ", "")
            .replace("+", "")
            .replace("-", "")
            .replace("-", "") +
          "?m=Hola%20" +
          String(rm.name).split(" ")[0] +
          "%0A%0A" +
          encodeURIComponent(qbody.msg);
        // const fetched = await fetch(fmessage, {
        //   method: "POST",
        // });
        // const resultFetched = await fetched.json();
        // console.log(Result, resultFetched);
        console.log("result");
      } catch (error) {
        console.log("Error en Send Mass Wa");
      }

      i++;
      if (i < res_ids.length) {
        looping();
      }

      if (i >= res_ids.length) {
        return res.json({
          current: true,
        });
      }
    }, 5000);
  };

  looping();
}
