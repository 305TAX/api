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
      name: "BOOKKEEPING (TAX)",
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

  fetch("https://qb-305tax.vercel.app/getCompanyInfo", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return res.json({
        result: data,
      });
    });
  // // const customer = "Reinaldo Armas";
  // // let linkRedirect = "https://305tax.com/";

  // // const result = encodeURI(
  // //   `Estimado, ${customer}.\n\nLe damos las gracias por elegir a 305TAX como sus asesores tributarios y por permitirnos ayudarle con sus necesidades fiscales. Esperamos que haya quedado satisfecho con el nivel de servicio que le hemos proporcionado y que su experiencia haya sido positiva.\n\nComo pequeña empresa, dependemos en gran medida de las opiniones positivas y de las recomendaciones de boca en boca. Estaríamos muy agradecidos si pudiera dedicar unos minutos a dejarnos su opinión sobre nuestros servicios.\n\nHaz click en el siguiente enlace:\n${linkRedirect}`
  // // );

  // //const arrBody = JSON.parse(JSON.stringify(req.body));
  // const arrBody = JSON.parse(JSON.stringify(req.body));
  // const newBoards = [];

  // const queryArray = "query { boards (limit:40) { id name workspace {name id}  }}";
  // const queryCreateItem =
  //   'mutation { create_item (board_id: 4589083677, item_name: "afd", column_values: "{\\"date4\\":\\"2023-05-25\\", \\"status\\":\\"2\\"}") { id name }}';
  // const queryWok =
  //   "query { workspaces (id: 1234567) { id name kind description }}}";
  // const queryW = "query { workspaces (limit:40) { id name kind description }}";

  // const resp = await fetch("https://api.monday.com/v2", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization:
  //       "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2MDIyMDgwMiwiYWFpIjoxMSwidWlkIjozNzE3MzE0OCwiaWFkIjoiMjAyMy0wNi0wMlQxNToxNjo0Ni4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQzOTMxNzMsInJnbiI6InVzZTEifQ.DKOZtmfsOv5OC6DDUwfMiI8fGdx3VOkZks3OmVHINRA",
  //     "API-Version": "2023-04",
  //   },
  //   body: JSON.stringify({
  //     query: queryW,
  //   }),
  // });

  // arrBody.boards.forEach((element, index) => {
  //   const newElement = element.split("(")[1].split(")")[0].replace(",", "");
  //   newBoards.push({
  //     boardId: Number(newElement),
  //     boardName: Boards[Number(newElement) - 1],
  //   });
  // });

  // const mamit = await resp.json();

  // return res.json({
  //   res: mamit,
  //   boards: newBoards,
  // });

  // arrBody?.boards.forEach((element, index) => {
  //
  //      arrBody?.boards[index] = String(newElement);
  // });

  // console.log("ESTIMADO", arrBody, req.query);
  // return res.json({
  //   reuslt: ,
  // });
}
