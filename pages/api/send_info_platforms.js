//import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  /** 0 = HOT LEAD INVOICE / 1 = ESTIMATE */

  /** VARIABLES */
  const currentYear = new Date().getFullYear();
  const customerOdoo = JSON.parse(JSON.stringify(req.body));

  if (customerOdoo?.dest == 0) {
    //LE DAN A INVOICE
    console.log("Peticion recibida desde HOT LEAD INVOICE");
  } else {
    console.log("Peticion recibida desde ESTIMATE");
  }

  // if (String(customerOdoo?.invoice).toUpperCase() == "TRUE") {
  //   console.log("INVOICE ACTIVO", customerOdoo);
  // } else {
  //   console.log("INVOICE FALSE", customerOdoo);
  // }

  return res.json({
    currentYear: currentYear,
  });
}
