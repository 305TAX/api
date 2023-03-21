import Odoo from "odoo-xmlrpc";
import NextCors from "nextjs-cors";

const searchReviews = () => {
  let result;

  let odoo = new Odoo({
    url: "https://305tax.odoo.com",
    db: "305tax",
    username: "joalexint@gmail.com",
    password: "17569323Jouu1n*",
  });

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["active", "=", true]]);
    var params = [];
    params.push(inParams);

    odoo.connect(function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Connected to Odoo server.");
    });

    odoo.execute_kw("helpdesk.ticket", "search", params, async (err, value) => {
      if (err) return console.log("ERROR:", err);

      let inParams = [];
      inParams.push(value); //ids
      inParams.push([
        "name",
        "company_id",
        "email",
        "domain_user_ids",
        "commercial_partner_id",
        "kanban_state",
        "stage_id",
        "access_token",
        "active",
        "rating",
      ]);

      let params = [];
      params.push(inParams);

      odoo.execute_kw("helpdesk.ticket", "read", params, (err2, value2) => {
        if (err2) return console.log("ERROR:", err2);

        result = value2;
        return result;
      });
    });
  });
};

export default searchReviews;
