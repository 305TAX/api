import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let odoo = new Odoo(odooConfig);
  const q = req.query;
  // const q = req.body;

  let isRosafrancia = q?.isRosafrancia ? true : false;
  let referredBy = q?.referredBy ? q?.referredBy : false;
  let catid = [];

  q?.categoryId
    ? String(q?.categoryId)
        .split(",")
        .forEach((cid, index) => {
          catid.push(Number(cid));
        })
    : false;

  const createNewLeadCRM = async (data) => {
    return await new Promise((resolve, reject) => {
      odoo.connect(function (err) {
        if (err) {
          return console.log(err);
        }

        let inParams = [];

        inParams.push({
          partner_id: data,
          name: String(q?.name).toUpperCase(),
          email_from: String(q?.email),
          user_id: "",
        });

        let params = [];
        params.push(inParams);

        odoo.execute_kw("crm.lead", "create", params, function (err2, value2) {
          if (err2) {
            return console.log(err2);
          }

          return resolve({
            state: true,
            result: value2,
          });
        });
      });
    });
  };

  const createNewPartner = new Promise(async (resolve, reject) => {
    odoo.connect(async function (err) {
      if (err) {
        return console.log(err);
      }

      // var leteer = {
      //   isRosafrancia: "true",
      //   mobile: "+584246553322",
      //   contact_origin:
      //     "LANDING PAGE ROSAFRANCIA - SERIE DE WEBINARS EPISODIO #1",
      //   name: "Test Test",
      //   zoom_meeting_id: "81695113252",
      //   email: "thecapiorfox@gmail.com",
      //   referredBy: "118",
      //   zoom_topic:
      //     "EPISODIO #2: IMPUESTOS A LOS QUE ESTÁN SUJETOS LOS EXTRANJEROS INVERSIONISTAS EN BIENES RAICES",
      //   pwd: "FijJ5sY8sxqfSWoB9DVZXRJwVYaGFa.1",
      //   zoom_url:
      //     "https://us06web.zoom.us/w/81695113252?tk=g5LIVeJrnAFIuKlNryFehtiO3YsL-8rpRRfD9WfBHNM.DQQAAAATBWiAJBZqck5LbUJfZVJieWo5ek8zajlVOGhRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      //   categoryId: "94,95",
      // };

      let inParams = [];
      inParams.push({
        name: String(q?.name),
        email: String(q?.email),
        mobile: String(q?.mobile),
        x_studio_country_origin: String(q?.country_origin),
        x_studio_status_verify: String(1),
        x_studio_isrosafrancia: isRosafrancia,
        x_studio_referred_by_many: referredBy,
        x_studio_contact_origin: String(q?.contact_origin),
        x_studio_zoom_url: `${q?.zoom_url}&pwd=${q?.pwd}`,
        x_studio_zoom_meeting_id: String(q?.zoom_meeting_id),
        x_studio_zoom_topic: String(q?.zoom_topic),
        category_id: catid,
      });

      let params = [];
      params.push(inParams);

      odoo.execute_kw(
        "res.partner",
        "create",
        params,
        async function (err, value) {
          if (err) {
            return console.log(err);
          }

          console.log("Result: ", value);

          if (value) {
            const crt = await createNewLeadCRM(value);

            if (crt?.state == true) {
              return resolve({
                status: true,
                result: [value, crt?.result],
              });
            }
          }
        }
      );
    });
  });

  const responseOne = await createNewPartner;
  return res.status(200).json(responseOne);
}
