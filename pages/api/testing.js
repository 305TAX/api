import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const customer = "Reinaldo Armas";
  let linkRedirect = "https://305tax.com/";

  const result = encodeURI(
    `Estimado, ${customer}.\n\nLe damos las gracias por elegir a 305TAX como sus asesores tributarios y por permitirnos ayudarle con sus necesidades fiscales. Esperamos que haya quedado satisfecho con el nivel de servicio que le hemos proporcionado y que su experiencia haya sido positiva.\n\nComo pequeña empresa, dependemos en gran medida de las opiniones positivas y de las recomendaciones de boca en boca. Estaríamos muy agradecidos si pudiera dedicar unos minutos a dejarnos su opinión sobre nuestros servicios.\n\nHaz click en el siguiente enlace:\n${linkRedirect}`
  );

  return res.send(result);
}
