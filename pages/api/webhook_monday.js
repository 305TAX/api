//import clientPromise from "../../lib/mongodb";

//import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
//import { odooConfig } from "../../lib/odooConfig";

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  //QUERY
  const p = req.query;

  const capitalized = (word) => {
    let wordSplit = String(word).split(" ");
    let result = "";
    for (let index = 0; index < wordSplit.length; index++) {
      const element = wordSplit[index];
      result = result.concat(
        element.charAt(0).toUpperCase() + element.slice(1) + " "
      );
    }

    return result;
  };

  const queryArray = "query { boards (ids:4589083677) { name columns {id title} }}"
  const queryCreateItem = "mutation { create_item (board_id: 4589083677, item_name: \"afd\", column_values: \"{\\\"date4\\\":\\\"2023-05-25\\\", \\\"status\\\":\\\"2\\\"}\") { id name }}"

  const resp = await fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI2MDIyMDgwMiwiYWFpIjoxMSwidWlkIjozNzE3MzE0OCwiaWFkIjoiMjAyMy0wNi0wMlQxNToxNjo0Ni4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQzOTMxNzMsInJnbiI6InVzZTEifQ.DKOZtmfsOv5OC6DDUwfMiI8fGdx3VOkZks3OmVHINRA",
      "API-Version": "2023-04",
    },
    body: JSON.stringify({
      query: "query { boards (limit:40) { id name columns {id title} }}",
    }),
  });
  const mamit = await resp.json();

  return res.json({
    res: mamit,
  });
}
