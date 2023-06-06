//import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const Boards = [
    {
      name: "INCOME TAX",
    },
    {
      name: "ANNUAL REPORT",
    },
    {
      name: "FORM 5471",
    },
    {
      name: "FINCEN 114",
    },
    {
      name: "BOOKKEEPING",
    },
    {
      name: "PAYROLL",
    },
    {
      name: "941",
    },
    {
      name: "940 & W2",
    },
    {
      name: "RT6",
    },
    {
      name: "SALES TAX MONTHLY",
    },
    {
      name: "SALES TAX QUARTERLY",
    },
    {
      name: "SALES TAX ANNUAL",
    },
    {
      name: "NEW BUSINESS",
    },
    {
      name: "DR1",
    },
    {
      name: "ITIN",
    },
    {
      name: "EFTPS PAYROLL",
    },
    {
      name: "EIN",
    },
    {
      name: "EFTPS INCOME TAX",
    },
    {
      name: "FORM 2553 8832",
    },
    {
      name: "FIRPTA",
    },
    {
      name: "DBPR R16",
    },
    {
      name: "IRS DOR COMM",
    },
    {
      name: "MARKETING",
    },
    {
      name: "PROSPECTIVE",
    },
    {
      name: "BE-12C",
    },
    {
      name: "TEST WEBHOOK",
    },
  ];

  // const customer = "Reinaldo Armas";
  // let linkRedirect = "https://305tax.com/";

  // const result = encodeURI(
  //   `Estimado, ${customer}.\n\nLe damos las gracias por elegir a 305TAX como sus asesores tributarios y por permitirnos ayudarle con sus necesidades fiscales. Esperamos que haya quedado satisfecho con el nivel de servicio que le hemos proporcionado y que su experiencia haya sido positiva.\n\nComo pequeña empresa, dependemos en gran medida de las opiniones positivas y de las recomendaciones de boca en boca. Estaríamos muy agradecidos si pudiera dedicar unos minutos a dejarnos su opinión sobre nuestros servicios.\n\nHaz click en el siguiente enlace:\n${linkRedirect}`
  // );

  const arrBody = req.body;
  console.log("SE ENVIO", req.query, "BODY", arrBody);

  return res.json({
    reuslt: "listo",
  });
}
