//import clientPromise from "../../lib/mongodb";

import Odoo from "odoo-xmlrpc";

import NextCors from "nextjs-cors";
import { odooConfig } from "../../lib/odooConfig";

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  //ODOO CONFIGURATION

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

  const links = [
    {
      display_name: "Form W-4 Employee's Withholding Certificate",
      id: 0,
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/pub/irs-pdf/fw4.pdf",
      x_studio_category: "Internal Revenue Service (IRS) Forms",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Form I-9 Employment Eligibility Verification",
      id: 1,
      x_studio_description: "",
      x_studio_href: "https://www.uscis.gov/i-9",
      x_studio_category: "Internal Revenue Service (IRS) Forms",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name:
        "Form W-9 Request for Taxpayer Identification Number and Certification",
      id: 2,
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/pub/irs-pdf/fw9.pdf",
      x_studio_category: "Internal Revenue Service (IRS) Forms",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name:
        "Form 8-WBEN Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting (Individuals)",
      id: 3,
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/pub/irs-pdf/fw8ben.pdf",
      x_studio_category: "Internal Revenue Service (IRS) Forms",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name:
        "Form W-8ECI Certificate of Foreign Person's Claim That Income Is Effectively Connected With the Conduct of a Trade or Business in the United States",
      id: 4,
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/pub/irs-pdf/fw8eci.pdf",
      x_studio_category: "Internal Revenue Service (IRS) Forms",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Refunds ",
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/refunds",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Payments",
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/payments",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Tax Withholding Estimator",
      x_studio_description: "",
      x_studio_href:
        "https://www.irs.gov/individuals/tax-withholding-estimator",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Get Your Tax Records",
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/individuals/get-transcript",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Filing Information",
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/filing",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Installment Agreement (Form 9465)",
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/forms-pubs/about-form-9465",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name:
        "ITIN: Apply for an Individual Taxpayer Identification Number Online",
      x_studio_description: "",
      x_studio_href: "https://www.irs.gov/pub/irs-pdf/fw7.pdf",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "EIN: Apply for an Employer Identification Number Online",
      x_studio_description: "",
      x_studio_href:
        "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "EFTPS: The Electronic Federal Tax Payment System",
      x_studio_description: "",
      x_studio_href:
        "https://www.irs.gov/payments/eftps-the-electronic-federal-tax-payment-system",
      x_studio_category: "Internal Revenue Service (IRS) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Homepage",
      x_studio_description: "",
      x_studio_href: "https://floridarevenue.com/pages/default.aspx",
      x_studio_category: "Florida Department of Revenue (FL DOR) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Enroll to File and Pay Electronically",
      x_studio_description: "",
      x_studio_href: "https://taxapps.floridarevenue.com/EEnrollment/",
      x_studio_category: "Florida Department of Revenue (FL DOR) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "File and Pay Taxes, Fees, and Remittances",
      x_studio_description: "",
      x_studio_href:
        "https://floridarevenue.com/taxes/eservices/Pages/filepay.aspx",
      x_studio_category: "Florida Department of Revenue (FL DOR) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Guide: Registering Your Business",
      x_studio_description: "",
      x_studio_href:
        "https://floridarevenue.com/Forms_library/current/dr1n.pdf",
      x_studio_category: "Florida Department of Revenue (FL DOR) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Guide: Considering Business Opportunities in Florida?",
      x_studio_description: "",
      x_studio_href:
        "https://floridarevenue.com/Forms_library/current/gt800029.pdf",
      x_studio_category: "Florida Department of Revenue (FL DOR) Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Health Insurance through Healthcare Marketplace",
      x_studio_description: "",
      x_studio_href: "https://www.healthcare.gov/",
      x_studio_category: "Other Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "U.S. Small Business Administration Webpage",
      x_studio_description: "",
      x_studio_href: "https://lending.sba.gov/",
      x_studio_category: "Other Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name:
        "Florida Department of State, Division of Corporations (Sunbiz)",
      x_studio_description: "",
      x_studio_href: "https://dos.myflorida.com/sunbiz/",
      x_studio_category: "Other Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Business & Professional Regulation",
      x_studio_description: "",
      x_studio_href: "https://www.stateofflorida.com/business-regulation/",
      x_studio_category: "Other Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Miami-Dade Property Search",
      x_studio_description: "",
      x_studio_href:
        "https://www.miamidade.gov/global/service.page?Mduid_service=ser1469481154653654",
      x_studio_category: "Other Links",
      x_studio_translate_to_spanish: "",
    },
    {
      display_name: "Miami-Dade Tax Collector",
      x_studio_description: "",
      x_studio_href: "https://www.miamidade.gov/global/taxcollector/home.page",
      x_studio_category: "Other Links",
      x_studio_translate_to_spanish: "",
    },
  ];

  return res.status(200).json(links);
  // //FUNCTION
  // odoo.connect((err) => {
  //   if (err) {
  //     console.log("ERROR", err);
  //     return res.json({
  //       error: err,
  //     });
  //   }

  //   let inParams = [];
  //   inParams.push([]);
  //   inParams.push([
  //     "display_name",
  //     "id",
  //     "x_studio_description",
  //     "x_studio_href",
  //     "x_studio_category",
  //     "x_studio_translate_to_spanish",
  //   ]);

  //   let params = [];
  //   params.push(inParams);

  //   odoo.execute_kw("x_useful_links", "search_read", params, (err, value) => {
  //     if (err) return console.log("ERROR:", err);

  //     if (value.length < 1) return res.json([]);

  //     return res.json(value);
  //   });
  // });
}
