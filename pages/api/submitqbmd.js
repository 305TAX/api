//import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const currentYear = new Date().getFullYear();

  const customerOdoo = JSON.parse(JSON.stringify(req.body));

  const body_res = {
    FullyQualifiedName: String(
      customerOdoo?.companyname
        ? customerOdoo?.companyname
        : customerOdoo?.displayname
    ),
    PrimaryEmailAddr: {
      Address: String(customerOdoo?.email ? customerOdoo?.email : ""),
    },
    DisplayName: String(
      customerOdoo?.displayname ? customerOdoo?.displayname : ""
    ),
    Suffix: String(customerOdoo?.suffix ? customerOdoo?.suffix : ""),
    Title: String(customerOdoo?.title ? customerOdoo?.title : ""),
    MiddleName: String(
      customerOdoo?.middlename ? customerOdoo?.middlename : ""
    ),
    Notes: "",
    FamilyName: String(
      customerOdoo?.familyname
        ? String(customerOdoo?.familyname).split(" ")[1]
        : ""
    ),
    PrimaryPhone: {
      FreeFormNumber: String(
        customerOdoo?.phonenumber ? customerOdoo?.phonenumber : ""
      ),
    },
    CompanyName: String(
      customerOdoo?.companyname ? customerOdoo?.companyname : ""
    ),
    BillAddr: {
      CountrySubDivisionCode: String(
        customerOdoo?.state ? customerOdoo?.state : ""
      ),
      City: String(customerOdoo?.city ? customerOdoo?.city : ""),
      PostalCode: String(customerOdoo?.zip ? customerOdoo?.zip : ""),
      Line1: String(customerOdoo?.address ? customerOdoo?.address : ""),
      Country: String(customerOdoo?.country ? customerOdoo?.country : ""),
    },
    GivenName: String(
      customerOdoo?.givenname
        ? String(customerOdoo?.givenname).split(" ")[0]
        : ""
    ),
  };

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
      name: "PENDIENTES",
    },
    {
      name: "IRS DOR COMM",
    },
    {
      name: "MARKETING",
    },
    {
      name: "BE-12C",
    },
  ];

  //const arrBody = JSON.parse(JSON.stringify(req.body));
  const arrBody = JSON.parse(JSON.stringify(req.body));
  const newBoards = [];

  //   const queryArray = "query { boards (limit:40) { id name workspace  }}";
  //   const queryCreateItem =
  //     'mutation { create_item (board_id: 4589083677, item_name: "afd", column_values: "{\\"date4\\":\\"2023-05-25\\", \\"status\\":\\"2\\"}") { id name }}';
  //   const queryWok =
  //     "query { workspaces (id: 1234567) { id name kind description }}}";
  //   const queryW = "query { workspaces (limit:40) { id name kind description }}";

  const showAllWorkspaces =
    "query {workspaces (limit:40) {id name kind description} }";

  const resp = await fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2MDIyMDgwMiwiYWFpIjoxMSwidWlkIjozNzE3MzE0OCwiaWFkIjoiMjAyMy0wNi0wMlQxNToxNjo0Ni4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQzOTMxNzMsInJnbiI6InVzZTEifQ.DKOZtmfsOv5OC6DDUwfMiI8fGdx3VOkZks3OmVHINRA",
      "API-Version": "2023-04",
    },
    body: JSON.stringify({
      query: showAllWorkspaces,
    }),
  });

  // arrBody.boards.forEach((element, index) => {
  //   const newElement = element.split("(")[1].split(")")[0].replace(",", "");
  //   newBoards.push({
  //     boardId: Number(newElement),
  //     boardName: Boards[Number(newElement) - 1],
  //   });
  // });

  const { data } = await resp.json();
  const workspaces = data?.workspaces;

  const result = workspaces.filter((elm) => String(elm.name).includes("2023"));

  const showAllBoards = `query {boards (workspace_ids:${result[0]?.id} limit:100) { name } }`;

  const resp2 = await fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2MDIyMDgwMiwiYWFpIjoxMSwidWlkIjozNzE3MzE0OCwiaWFkIjoiMjAyMy0wNi0wMlQxNToxNjo0Ni4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQzOTMxNzMsInJnbiI6InVzZTEifQ.DKOZtmfsOv5OC6DDUwfMiI8fGdx3VOkZks3OmVHINRA",
      "API-Version": "2023-04",
    },
    body: JSON.stringify({
      query: showAllBoards,
    }),
  });

  const databoards = await resp2.json();
  const boards = databoards?.data?.boards.filter(
    (elm) => !String(elm.name).includes("Subitems")
  );

  //const fd = mamit.filter((element) => String(element?.name).includes("2023"));
  console.log("EJECUTADO EL SUBMIT", body_res);
  return res.json({
    currentYear: currentYear,
    workspaces: result[0],
    boards: [boards.length, Boards.length],
    body: body_res,
  });

  // arrBody?.boards.forEach((element, index) => {
  //
  //      arrBody?.boards[index] = String(newElement);
  // });

  // console.log("ESTIMADO", arrBody, req.query);
  // return res.json({
  //   reuslt: ,
  // });
}
