//import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  /** VARIABLES */
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
      id: 1,
    },
    {
      name: "ANNUAL REPORT",
      id: 2,
    },
    {
      name: "FORM 5471",
      id: 3,
    },
    {
      name: "FINCEN 114",
      id: 4,
    },
    {
      name: "BOOKKEEPING",
      id: 5,
    },
    {
      name: "BOOKKEEPING (TAX)",
      id: 6,
    },
    {
      name: "PAYROLL",
      id: 7,
    },
    {
      name: "941",
      id: 8,
    },
    {
      name: "940 & W2",
      id: 9,
    },
    {
      name: "RT6",
      id: 10,
    },
    {
      name: "SALES TAX MONTHLY",
      id: 11,
    },
    {
      name: "SALES TAX QUARTERLY",
      id: 12,
    },
    {
      name: "SALES TAX ANNUAL",
      id: 13,
    },
    {
      name: "NEW BUSINESS",
      id: 14,
    },
    {
      name: "DR1",
      id: 15,
    },
    {
      name: "ITIN",
      id: 16,
    },
    {
      name: "EFTPS PAYROLL",
      id: 17,
    },
    {
      name: "EIN",
      id: 18,
    },
    {
      name: "EFTPS INCOME TAX",
      id: 19,
    },
    {
      name: "FORM 2553 8832",
      id: 20,
    },
    {
      name: "FIRPTA",
      id: 21,
    },
    {
      name: "DBPR R16",
      id: 22,
    },
    {
      name: "PENDIENTES",
      id: 28,
    },
    {
      name: "IRS DOR COMM",
      id: 23,
    },
    {
      name: "MARKETING",
      id: 24,
    },
    {
      name: "BE-12C",
      id: 26,
    },
  ];

  //const arrBody = JSON.parse(JSON.stringify(req.body));
  //const arrBody = JSON.parse(JSON.stringify(req.body));
  // const newBoards = [];

  //   const queryArray = "query { boards (limit:40) { id name workspace  }}";
  //   const queryCreateItem =
  //     'mutation { create_item (board_id: 4589083677, item_name: "afd", column_values: "{\\"date4\\":\\"2023-05-25\\", \\"status\\":\\"2\\"}") { id name }}';
  //   const queryWok =
  //     "query { workspaces (id: 1234567) { id name kind description }}}";
  //   const queryW = "query { workspaces (limit:40) { id name kind description }}";

  /** QUERY SHOW ALL WORKSPACES */
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

  /** TRANSFORM BOARDS */

  const newBoards = customerOdoo?.boards
    .replace("x_boards", "")
    .replace("(", "")
    .replace(")", "")
    .replace(" ", "")
    .split(",")
    .filter((el) => el != "");

  const { data } = await resp.json();
  const workspaces = data?.workspaces;

  const result = workspaces.filter((elm) => String(elm.name).includes("2023"));

  const showAllBoards = `query {boards (workspace_ids:${result[0]?.id} limit:100) { id name } }`;

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

  const boardsDestination = [];

  // const pers = await axios.post(
  //   `${process.env.QB_API}/cc?q=${JSON.stringify(body_res)}`
  // );

  newBoards.forEach((element) => {
    const findBoardApi = Boards.filter((brd) => brd?.id == Number(element));
    if (findBoardApi) {
      boardsDestination.push(findBoardApi[0]);
    }
  });

  boardsDestination.forEach(async (bd, index) => {
    const boardD = boards.filter(
      (board) => String(board?.name).toUpperCase() == bd?.name
    );
    const mondayId = boardD[0]?.id;
    let queryCreateCustomer = `mutation { create_item (board_id: ${Number(
      mondayId
    )}, item_name: \"${
      body_res.DisplayName
    }\", column_values: \"{\\\"text9\\\":\\\"${
      customerOdoo?.x_studio_contact_name
        ? customerOdoo?.x_studio_contact_name
        : " "
    }\\\"}\") { id }}`;

    const createCustomerMonday = await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2MDIyMDgwMiwiYWFpIjoxMSwidWlkIjozNzE3MzE0OCwiaWFkIjoiMjAyMy0wNi0wMlQxNToxNjo0Ni4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQzOTMxNzMsInJnbiI6InVzZTEifQ.DKOZtmfsOv5OC6DDUwfMiI8fGdx3VOkZks3OmVHINRA",
        "API-Version": "2023-04",
      },
      body: JSON.stringify({
        query: queryCreateCustomer,
      }),
    });

    const result = await createCustomerMonday.json();

    console.log(index + 1, "SE EJECUTO", bd, "MONDAY ID", boardD[0], mondayId);
  });

  //const example = boards.filter(brdt => String(brdt?.name).toUpperCase().includes("FORM 2553 | 8832"))

  //const fd = mamit.filter((element) => String(element?.name).includes("2023"));
  console.log("EJECUTADO EL SUBMIT", customerOdoo);
  return res.json({
    currentYear: currentYear,
    workspaces: result[0],
    boards: boardsDestination.length,
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
