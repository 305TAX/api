//import clientPromise from "../../lib/mongodb";
import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  //ODOO CONFIGURATION
  let odoo = new Odoo(odooConfig);

  const query = req.query;
  // const query = req.body;

  // console.log("REUSLT SUSCCESS", query);

  const fromButton = Number(query?.event_id) != -1 ? false : true;

  const teamPromise = new Promise((resolve, reject) => {
    let result = "";

    odoo.connect(function (err) {
      if (err) return reject(err);

      let inParams = [];
      inParams.push([]);
      inParams.push(["partner_id"]);

      let params = [];
      params.push(inParams);

      odoo.execute_kw(
        "res.users",
        "search_read",
        params,
        function (err, value) {
          if (err) return reject(err);

          let resultFinish = value?.map((tm) => tm?.partner_id[0]);
          result = resultFinish;
          resolve(resultFinish);
        }
      );
    });
  });

  const team = await teamPromise
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return {
        err: error,
      };
    });

  if (!fromButton) {
    odoo.connect(function (err) {
      if (err)
        return res.json({
          err: err,
        });

      let inParams2 = [];
      inParams2.push([["id", "=", Number(query?.event_id)]]);
      inParams2.push(["name", "partner_ids"]);

      let params2 = [];
      params2.push(inParams2);

      odoo.execute_kw(
        "calendar.event",
        "search_read",
        params2,
        async function (err2, value2) {
          if (err2) return res.json({ err: err2 });

          let eventInfo = value2[0];

          const writeCalendar = new Promise((resolve, reject) => {
            let inParams = [];
            inParams.push([Number(query?.event_id)]); //id to update

            inParams.push({
              videocall_location: String(query?.zoom_url),
              x_studio_zoom_meeting_id: query?.meeting_id,
              x_studio_zoom_topic: query?.topic,
              x_studio_zoom_password: query?.password,
              x_studio_zoom_start_time: query?.start_time,
              x_studio_zoom_url: query?.zoom_url,
              x_studio_zoom_time_zone: query?.time_zone,
            });

            let params = [];

            params.push(inParams);

            odoo.execute_kw(
              "calendar.event",
              "write",
              params,
              function (errC, valueC) {
                if (errC) return reject(errC);

                resolve(true);
              }
            );
          });

          const updateUsersZoom = new Promise((resolve, reject) => {
            let res_ids = eventInfo.partner_ids;

            let inParams = [];

            inParams.push(res_ids);

            inParams.push({
              x_studio_zoom_meeting_id: query?.meeting_id,
              x_studio_zoom_topic: query?.topic,
              x_studio_zoom_password: query?.password,
              x_studio_zoom_start_time: query?.start_time,
              x_studio_zoom_url: query?.zoom_url,
              x_studio_zoom_time_zone: query?.time_zone,
            });

            let params = [];
            params.push(inParams);

            odoo.execute_kw(
              "res.partner",
              "write",
              params,
              function (err, value) {
                if (err) return reject(err);

                resolve(value);
              }
            );
          });

          const isTeam =
            Array.from(eventInfo?.partner_ids).filter((fd) => team.includes(fd))
              .length >= 1
              ? true
              : false;

          if (isTeam) {
            Array.from(eventInfo?.partner_ids)
              .filter((fd) => team.includes(fd))
              .map(
                (i) =>
                  (eventInfo.partner_ids = [...eventInfo.partner_ids].filter(
                    (item) => item !== Number(i)
                  ))
              );
          }

          const countPartnerIds = Array.from(eventInfo.partner_ids).length;

          if (countPartnerIds >= 1) {
            const responseCalendar = await writeCalendar
              .then((result) => result)
              .catch((err) => err);

            if (responseCalendar === true) {
              const responseUpdateZoom = await updateUsersZoom
                .then((result) => result)
                .catch((err) => err);

              return res.json({
                statusCalendar: responseCalendar,
                statusUpdateUserZoom: responseUpdateZoom,
              });
            } else {
              return res.status(502).json({
                err: responseCalendar,
                err: responseUpdateZoom,
              });
            }
          } else if (countPartnerIds === 0) {
            const responseCalendar = await writeCalendar
              .then((result) => result)
              .catch((err) => err);

            if (responseCalendar === true) {
              return res.json({
                statusCalendar: responseCalendar,
              });
            } else {
              return res.status(502).json({
                err: responseCalendar,
              });
            }
          }
        }
      );
    });
  } else {
    const splitTimeOdoo = String(query?.start_time)
      .replace("T", " ")
      .replace("Z", " ")
      .trim()
      .split(" ");

    const date = `${splitTimeOdoo[0]} ${splitTimeOdoo[1]}`;

    odoo.connect(async function (err) {
      if (err)
        return res.json({
          err: err,
        });

      const verifyCalendar = new Promise((resolve, reject) => {
        let inParams = [];
        inParams.push([]);
        inParams.push(["name", "partner_ids", "start"]);

        let params = [];
        params.push(inParams);

        odoo.execute_kw(
          "calendar.event",
          "search_read",
          params,
          async function (err, value) {
            if (err) return reject(err);

            let searchResult = Array.from(value).filter((val) =>
              val?.partner_ids.includes(2852)
            );

            if (searchResult.length >= 1) {
              searchResult
                .filter((val) => String(val?.start).includes(splitTimeOdoo[0]))
                .map((rs) =>
                  resolve({
                    status: true,
                    result: rs,
                  })
                );
            } else {
              resolve({
                status: false,
              });
            }
          }
        );

        // let inParams = [];
        // inParams.push([Number(query?.event_id)]); //id to update

        // inParams.push({
        //   videocall_location: String(query?.zoom_url),
        //   x_studio_zoom_meeting_id: query?.meeting_id,
        //   x_studio_zoom_topic: query?.topic,
        //   x_studio_zoom_password: query?.password,
        //   x_studio_zoom_start_time: query?.start_time,
        //   x_studio_zoom_url: query?.zoom_url,
        //   x_studio_zoom_time_zone: query?.time_zone,
        // });

        // let params = [];

        // params.push(inParams);

        // odoo.execute_kw(
        //   "calendar.event",
        //   "write",
        //   params,
        //   function (errC, valueC) {
        //     if (errC) return reject(errC);

        //     resolve(true);
        //   }
        // );
      });

      const resFindCalendar = await verifyCalendar
        .then((result) => result)
        .catch((err) => {
          return res.status(502).json({
            err: err,
          });
        });

      const writeCalendar = new Promise((resolve, reject) => {
        let inParams = [];
        inParams.push([Number(resFindCalendar?.result?.id)]); //id to update

        inParams.push({
          videocall_location: String(query?.zoom_url),
          x_studio_zoom_meeting_id: query?.meeting_id,
          x_studio_zoom_topic: query?.topic,
          x_studio_zoom_password: query?.password,
          x_studio_zoom_start_time: query?.start_time,
          x_studio_zoom_url: query?.zoom_url,
          x_studio_zoom_time_zone: query?.time_zone,
        });

        let params = [];

        params.push(inParams);

        odoo.execute_kw(
          "calendar.event",
          "write",
          params,
          function (errC, valueC) {
            if (errC) return reject(errC);

            resolve(true);
          }
        );
      });

      const updateUsersZoom = new Promise((resolve, reject) => {
        Array.from(resFindCalendar.result.partner_ids)
          .filter((fd) => team.includes(fd))
          .map(
            (i) =>
              (resFindCalendar.result.partner_ids = [
                ...resFindCalendar.result.partner_ids,
              ].filter((item) => item !== Number(i)))
          );

        let res_ids = resFindCalendar.result.partner_ids;
        let inParams = [];

        inParams.push(res_ids);

        inParams.push({
          x_studio_zoom_meeting_id: query?.meeting_id,
          x_studio_zoom_topic: query?.topic,
          x_studio_zoom_password: query?.password,
          x_studio_zoom_start_time: query?.start_time,
          x_studio_zoom_url: query?.zoom_url,
          x_studio_zoom_time_zone: query?.time_zone,
        });

        let params = [];
        params.push(inParams);

        odoo.execute_kw("res.partner", "write", params, function (err, value) {
          if (err) return reject(err);

          resolve(value);
        });
      });

      if (resFindCalendar?.status) {
        const responseCalendar = await writeCalendar
          .then((result) => result)
          .catch((err) => err);

        if (responseCalendar === true) {
          const responseUpdateZoom = await updateUsersZoom
            .then((result) => result)
            .catch((err) => err);

          return res.json({
            statusCalendar: responseCalendar,
            statusUpdateUserZoom: responseUpdateZoom,
          });
        } else {
          return res.status(502).json({
            err: responseCalendar,
            err: responseUpdateZoom,
          });
        }
      } else {
        const responseUpdateZoom = await updateUsersZoom
          .then((result) => result)
          .catch((err) => err);

        return res.json({
          statusUpdateUserZoom: responseUpdateZoom,
        });
      }
    });
    // return res.json({
    //   result: splitTimeOdoo,
    //   result2: date(),
    // });
  }

  //   odoo.connect(function (err) {
  //     if (err) return console.log(err);

  //     let inParams = [];
  //     inParams.push([['id', '=', 129]]);
  //     inParams.push(['name']);

  //     let params = [];
  //     params.push(inParams);

  //     odoo.execute_kw('calendar.event', 'search_read', params, function (err, value) {
  //         if (err) { return console.log(err, params); }

  //         return res.json(value)
  //     });
  // });

  // const team = odoo.connect(async function (err) {
  //   if (err) return console.log(err);

  //   var inParams = [];
  //   // inParams.push([
  //   //   ["is_company", "=", true],
  //   //   ["customer", "=", true],
  //   // ]);
  //   inParams.push([["partner_ids", "=", [8]]]);
  //   inParams.push(["name", "id", "partner_ids", "start"]); //fields

  //   var params = [];
  //   params.push(inParams);

  //   var inParams2 = [];
  //   inParams2.push([]);
  //   inParams2.push(["name", "partner_id"]);

  //   var params2 = [];
  //   params2.push(inParams2);

  //   teamPromise
  //     .then((result) => {
  //       odoo.execute_kw(
  //         "calendar.event",
  //         "search_read",
  //         params,
  //         function (err, value) {
  //           if (err) return console.log(err);

  //           return res.json({

  //             val: value,
  //           });
  //         }
  //       );
  //     })
  //     .catch((err) => {

  //     });

  // });

  // return res.json({
  //   result: query,
  // });
}
