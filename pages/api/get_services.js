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
  let odoo = new Odoo(odooConfig);

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

  const services = [
    {
      x_studio_custom_url: "us-expatriate-tax",
      x_name: "US Expatriate Tax",
      Show: true,
      x_studio_translate_to_spanish: "Impuestos De Expatriados",
      x_studio_associated_page: "US Expatriate Tax",
      x_studio_description_to_spanish:
        "¿Eres ciudadano o residente estadounidense y vives/trabajas fuera de los EE. UU.? Si ganas más de cierto monto, debes presentar una declaración de impuestos.",
      x_studio_description:
        "¿Eres ciudadano o residente estadounidense y vives/trabajas fuera de los EE. UU.? Si ganas más de cierto monto, debes presentar una declaración de impuestos.",
      x_studio_keywords:
        "impuestos de expatriados, declaración anual de rentas, ciudadano estadounidense, residente permanente, renta mundial, ingresos anuales, deducciones tributarias, exclusiones fiscales, doral, estados unidos, miami, florida, fl doral, dl, eeuu, usa",
    },
    {
      x_studio_custom_url: "payroll-and-payroll-tax",
      x_name: "Payroll And Payroll Tax",
      Show: true,
      x_studio_translate_to_spanish: "Nómina E Impuestos De Nómina",
      x_studio_associated_page: "welcome",
      x_studio_description_to_spanish:
        "¿Gestionar las nóminas y los impuestos sobre las nóminas es un dolor de cabeza? 305TAX te ofrece los servicios con expertos para obtengas tranquilidad.",
      x_studio_description:
        "¿Gestionar las nóminas y los impuestos sobre las nóminas es un dolor de cabeza? 305TAX te ofrece los servicios con expertos para obtengas tranquilidad.",
      x_studio_keywords:
        "gestión de nóminas, cálculo de nóminas, impuestos sobre nóminas, cumplimiento fiscal, externalización de servicios de nóminas, procesamiento preciso de nóminas, gestión eficiente de impuestos, propietarios de pequeñas empresas, estados, estados unidos, usa, eeuu, taxes, doral, florida, fl, miami",
    },

    {
      x_studio_custom_url: "foreign-national-tax",
      x_name: "Foreign National Tax",
      Show: true,
      x_studio_translate_to_spanish:
        "Impuestos De Extranjeros<br/> No Residentes",
      x_studio_associated_page: "Foreign National Tax",
      x_studio_description_to_spanish:
        "¿Eres un estudiante internacional, trabajador temporal o inversor extranjero en Estados Unidos? Si tienes ingresos, debes presentar una declaración de impuestos.",
      x_studio_description:
        "¿Eres un estudiante internacional, trabajador temporal o inversor extranjero en Estados Unidos? Si tienes ingresos, debes presentar una declaración de impuestos.",
      x_studio_keywords:
        "impuestos extranjeros no residentes, declaración anual de rentas, responsabilidades fiscales, extranjeros no residentes en Estados Unidos, prueba de presencia sustancial, tratado de impuestos, asesoramiento fiscal, usa, estados unidos, florida, doral, miami, texas",
    },
    {
      x_studio_custom_url: "ein-application",
      x_name: "EIN Application",
      Show: true,
      x_studio_translate_to_spanish: "Solicitud De EIN",
      x_studio_associated_page: "EIN Application",
      x_studio_description_to_spanish:
        "Nuestro servicio de solicitud de EIN simplifica el proceso de obtención de un Número de Identificación del Empleador (EIN, por sus siglas en inglés) del Servicio de Rentas Internos (IRS, por sus siglas en inglés) para su empresa nueva o existente.",
      x_studio_description:
        "Nuestro servicio de solicitud de EIN simplifica el proceso de obtención de un Número de Identificación del Empleador (EIN, por sus siglas en inglés) del Servicio de Rentas Internos (IRS, por sus siglas en inglés) para su empresa nueva o existente.",
      x_studio_keywords:
        "servicio de solicitud de EIN, Número de Identificación del Empleador, Servicio de Rentas Internos, empresa nueva o existente, proveedor de servicios de confianza, requisitos cumplidos con precisión y eficacia, formulario SS-4, trámites burocráticos reducidos, obtención rápida del EIN, necesidades bancarias fiscales o de cumplimiento normativo, estados unidos, eeuu, usa, miami, florida, fl, doral",
    },
    {
      x_studio_custom_url: "sales-and-use-tax",
      x_name: "Sales And Use Tax",
      Show: true,
      x_studio_translate_to_spanish: "Impuestos A Las Ventas<br/>Y Uso",
      x_studio_associated_page: "welcome",
      x_studio_description_to_spanish:
        "Si usted es dueño de una pequeña empresa, un minorista de comercio electrónico, o una gran corporación, estamos aquí para ofrecerle soluciones integrales adaptadas a sus necesidades específicas.",
      x_studio_description:
        "Si usted es dueño de una pequeña empresa, un minorista de comercio electrónico, o una gran corporación, estamos aquí para ofrecerle soluciones integrales adaptadas a sus necesidades específicas.",
      x_studio_keywords:
        "impuestos sobre ventas y uso, servicios profesionales, Florida, cumplimiento normativo, expertos contables, regulaciones fiscales, estados unidos, doral, miami, fl",
    },
    {
      x_studio_custom_url: "new-business-setup",
      x_name: "New Business Setup",
      Show: true,
      x_studio_translate_to_spanish: "Formación De <br/>Nuevos Negocios",
      x_studio_associated_page: "welcome",
      x_studio_description_to_spanish:
        "¿Quieres crear una nueva empresa? 305TAX te ofrece la ayuda profesional para asegurarte de cumplir todos los requisitos.",
      x_studio_description:
        "¿Quieres crear una nueva empresa? 305TAX te ofrece ayuda profesional para asegurarte de cumplir todos los requisitos.",
      x_studio_keywords:
        "formación de nuevos negocios, asesoramiento profesional, proceso de formación de la empresa, leyes y normativas aplicables, abogado de negocios, contador, inversores inmobiliarios, propietarios de pequeñas empresas, estructura empresarial ideal, presentación de documentos esenciales para establecer su negocio, ventajas fiscales, estados unidos, eeuu, usa, florida, fl, doral, miami",
    },
    {
      x_studio_custom_url: "business-tax",
      x_name: "Business Tax",
      Show: true,
      x_studio_translate_to_spanish: "Impuestos De Negocios",
      x_studio_associated_page: "Business Tax",
      x_studio_description_to_spanish:
        "Servicio de Asesoría Fiscal y Preparación de Impuestos para empresas con propietarios extranjeros.",
      x_studio_description:
        "Servicio de Asesoría Fiscal y Preparación de Impuestos para empresas con propietarios extranjeros.",
      x_studio_keywords:
        "asesoramiento fiscal, preparación de impuestos, empresas extranjeras, leyes fiscales internacionales, asistencia personalizada, estrategia fiscal personalizada, usa, estados unidos, miami, florida, doral",
    },
    {
      x_studio_custom_url: "itin-application",
      x_name: "ITIN Application",
      Show: true,
      x_studio_translate_to_spanish: "Solicitud De ITIN",
      x_studio_associated_page: "ITIN Application",
      x_studio_description_to_spanish:
        "¿Eres extranjero y necesitas un número de identificación fiscal para declarar impuestos? Obtén un ITIN hoy mismo con los profesionales de 305TAX.",
      x_studio_description:
        "¿Eres extranjero y necesitas un número de identificación fiscal para declarar impuestos? Obtén un ITIN hoy mismo con los profesionales de 305TAX.",
      x_studio_keywords:
        "servicios de impuestos, ITIN, extranjeros residentes, impuestos federales, número de identificación del contribuyente, Servicio de Impuestos Internos, estados unidos, doral, eeuu, usa, florida, fl, miami",
    },
    {
      x_studio_custom_url: "tax-planning",
      x_name: "Tax Planning",
      Show: true,
      x_studio_translate_to_spanish: "Planificacion Fiscal",
      x_studio_associated_page: "welcome",
      x_studio_description_to_spanish:
        "¿Quieres ahorrar dinero en impuestos? 305TAX cuenta con el conocimiento y experiencia fiscal para ayudarte.",
      x_studio_description:
        "¿Quieres ahorrar dinero en impuestos? 305TAX cuenta con el conocimiento y experiencia fiscal para ayudarte.",
      x_studio_keywords:
        "planificación fiscal, soluciones personalizadas, deducciones fiscales, complejos códigos fiscales, cumplimiento legal, decisiones financieras informadas, ahorro de dinero, panorama financiero actual, estados unidos, miami, doral, fl, florida",
    },
    {
      x_studio_custom_url: "pre-immigration-tax",
      x_name: "Pre-Immigration Tax",
      Show: true,
      x_studio_translate_to_spanish:
        "Planificación Fiscal <br/>Pre-Inmigración",
      x_studio_associated_page: "Pre-Immigration Tax",
      x_studio_description_to_spanish:
        "¿Planeas mudarte a Estados Unidos? La planificación fiscal previa a la inmigración puede ayudarte a ahorrar dinero.",
      x_studio_description:
        "¿Planeas mudarte a Estados Unidos? La planificación fiscal previa a la inmigración puede ayudarte a ahorrar dinero.",
      x_studio_keywords:
        "planificación fiscal, pre-inmigración, servicios fiscales, sistema fiscal estadounidense, residentes en Estados Unidos, impuestos sobre los ingresos, obligaciones fiscales, beneficios fiscales, normativa fiscal, estados unidos, doral, miami, usa, florida, fl",
    },
    {
      x_studio_custom_url: "amended-income-tax-returns",
      x_name: "Amended Income Tax Returns",
      Show: true,
      x_studio_translate_to_spanish: "Declaraciones De Impuestos Sustitutivas",
      x_studio_associated_page: "welcome",
      x_studio_description_to_spanish:
        "¿Identificaste errores u omisiones en tu declaración de impuestos? 305TAX te ayuda a presentar una declaración enmendada.",
      x_studio_description:
        "¿Identificaste errores u omisiones en tu declaración de impuestos? 305TAX te ayuda a presentar una declaración enmendada.",
      x_studio_keywords:
        "declaración de impuestos sustitutiva, errores en declaración de impuestos, cambios en estado civil, corrección de errores en deducciones o créditos, ingresos incorrectos o incompletos, trabajos por cuenta propia, alquiler de propiedades, ganancias de inversiones, declaración conjunta, declaración separada, estados unidos, usa, eeuu, florida, fl, doral, miami",
    },
    {
      x_studio_custom_url: "individual-tax",
      x_name: "Individual Tax",
      Show: true,
      x_studio_translate_to_spanish:
        "Impuestos De Ciudadanos <br/>Y Residentes",
      x_studio_associated_page: "Individual Tax",
      x_studio_description_to_spanish:
        "Servicio de Asesoría fiscal para individuos, empresas y propietarios de negocios de forma personalizada para su situación fiscal.",
      x_studio_description:
        "Servicio de Asesoría fiscal para individuos, empresas y propietarios de negocios de forma personalizada para su situación fiscal.",
      x_studio_keywords:
        "impuestos, ciudadanos, extranjeros residentes, servicios fiscales, soluciones fiscales personalizadas, asesoramiento fiscal, Estados Unidos, asalariado, trabajador independiente, pequeña empresa, inversiones y activos, sesiones de asesoramiento fiscal detalladas, planificación del impuesto sobre la renta, deducciones fiscales y créditos fiscales, estados unidos, miami, florida, usa, doral",
    },
    {
      x_studio_custom_url: "real-estate-tax",
      x_name: "Real Estate Tax",
      Show: true,
      x_studio_translate_to_spanish: "Impuestos Sobre <br/>Bienes Raíces",
      x_studio_associated_page: "Real Estate Tax",
      x_studio_description_to_spanish:
        "Nuestro servicio de consultoría tributaria y preparación de impuestos para inversores inmobiliarios en Doral, incluidos extranjeros no residentes.",
      x_studio_description:
        "Nuestro servicio de consultoría tributaria y preparación de impuestos para inversores inmobiliarios en Doral, incluidos extranjeros no residentes.",
      x_studio_keywords:
        "impuestos sobre bienes raíces, consultoría tributaria, preparación de impuestos, inversión inmobiliaria, extranjeros no residentes, estrategia fiscal, créditos fiscales, deducciones fiscales, cambios en el código tributario, cumplimiento de leyes y reglamentos, usa, florida, doral, estados unidos, miami",
    },
    {
      x_studio_custom_url: "back-taxes",
      x_name: "Back Taxes",
      Show: true,
      x_studio_translate_to_spanish: "Impuestos De Años Anteriores",
      x_studio_associated_page: "Back Tax",
      x_studio_description_to_spanish:
        "¿Le debe impuestos atrasados al IRS? No ignore el problema. Actúe ahora para evitar problemas fiscales más graves con 305TAX.",
      x_studio_description:
        "¿Le debe impuestos atrasados al IRS? No ignore el problema. Actúe ahora para evitar problemas fiscales más graves con 305TAX.",
      x_studio_keywords:
        "servicios fiscales, impuestos de años anteriores, deuda con irs, sanciones fiscales, intereses fiscales, embargo de salarios, embargo fiscal, deuda, back, taxes, usa, estados unidos, eeuu, usa, florida, fl, doral, miami",
    },
    {
      x_studio_custom_url: "bookkeeping",
      x_name: "Bookkeeping",
      Show: true,
      x_studio_translate_to_spanish: "Contabilidad",
      x_studio_associated_page: "welcome",
      x_studio_description_to_spanish:
        "¿Llevar la contabilidad de su empresa es un dolor de cabeza? 305TAX cuenta con contadores con suma experiencia que pueden ayudarle.",
      x_studio_description:
        "¿Llevar la contabilidad de su empresa es un dolor de cabeza? 305TAX cuenta con contadores con suma experiencia que pueden ayudarle.",
      x_studio_keywords:
        "contabilidad, asesoramiento, empresa, sistema de contabilidad, leyes y normativas aplicables, contador con experiencia, inversionistas inmobiliarios, propietarios de pequeñas empresas, gestión de sistemas de contabilidad, elegir sistema de contabilidad adecuado, formación en el uso del sistema de contabilidad, usa, estados unidos, eeuu, florida, fl, miami, doral",
    },
  ];

  if (p.url) {
    let value = Array.from(services).filter(
      (srv) => srv?.x_studio_custom_url == p.url
    );

    return res.json(value[0]);
  } else {
    return res.status(200).json(services);
  }

  //FUNCTION
  // odoo.connect((err) => {
  //   if (err) {
  //     console.log("ERROR", err);
  //     return res.json({
  //       error: err,
  //     });
  //   }

  //   let inParams = [];
  //   inParams.push([["x_studio_show", "=", true]]);
  //   inParams.push([
  //     "x_name",
  //     "id",
  //     "x_studio_custom_url",
  //     "x_studio_translate_to_spanish",
  //     "x_studio_associated_page",

  //     "x_studio_description",
  //     "x_studio_description_to_spanish",
  //     "x_studio_keywords",
  //   ]);

  //   let params = [];
  //   params.push(inParams);

  // });
}
