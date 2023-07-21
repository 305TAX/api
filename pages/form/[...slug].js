import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  Button,
  Spinner,
  Stepper,
  Step,
  Rating,
  Checkbox,
  Radio,
  Tooltip,
} from "@material-tailwind/react";

import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";
import { StarIcon as UnratedIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Verify = ({ userReview }) => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("es");
  //const [userCurrent, setUserCurrent] = useState({});
  const [thankState, setThankState] = useState(false);
  const [user_form_data, set_user_form_data] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [rquestions, setRQuestions] = useState({});
  const [modifyQuestions, setModifyQuestions] = useState({});
  const [originalQuestions, setOriginalQuestions] = useState({});
  const [ourQuestions, setOurQuestions] = useState({});

  const handleChangeChecked = (e) => {
    setRQuestions({
      ...rquestions,
      [e.target.name]: e.target.checked,
    });
  };

  const handleChangeRadio = (e, option) => {
    setRQuestions({
      ...rquestions,
      [e.target.name]: [e.target.checked, option],
    });
  };

  const handleChangeInput = (e) => {
    setRQuestions({
      ...rquestions,
      [e.target.name]: e.target.value,
    });
  };

  const questions = [
    {
      title:
        "¿Cuál es su principal objetivo en relación con la compra de una propiedad en Florida?",
      subtitle: "Seleccione las opciones que le apliquen:",
      type: "multiple_choice",
      items: [
        "Proteger mi patrimonio",
        "Obtener rentabilidad en rentas largas (más de 6 meses) de la propiedad",
        "Obtener rentabilidad en rentas cortas (menos de 6 meses) de la propiedad (Ejemplo: AIRBNB)",
        "Comprar a crédito y que el préstamo se pague con la renta de la propiedad",
        "Obtener plusvalía mediante la revalorización de la propiedad en el tiempo",
        "Para uso personal como propiedad vacacional",
        "Para que mis hijos vivan en ella mientras estudien en EEUU",
        "Como vivienda principal",
        "Otro",
      ],
    },
    {
      title: "¿A qué se dedica usted?",
      type: "input",
      rows: 1,
    },
    {
      title: "¿Qué tan pronto desea usted adquirir la propiedad?",

      type: "choice",
      items: [
        "A la brevedad posible",
        "Dentro de un período máximo de 3 a 6 meses",
        "En un plazo mayor que 6 meses",
      ],
    },
    {
      title:
        "¿Qué grado de conocimiento piensa usted que posee en relación con las leyes tributarias de los Estados Unidos?",
      type: "choice",
      items: [
        "Ninguno",
        "Limitado",
        "Promedio",
        "Por encima del promedio",
        "Extenso",
      ],
    },
    {
      title: "¿Cuál es su presupuesto máximo para invertir en esta compra?",
      subtitle: "Cantidades expresadas en miles de dólares estadounidenses",
      type: "choice",
      items: [
        "Menos de $250K",
        "Entre $250K y $499K",
        "Entre $500K y $749K",
        "Entre $750K y $999K",
        "Más de $999K",
      ],
    },
    {
      title: "¿Es esta su primera inversión en los Estados Unidos?",
      type: "choice",
      items: [
        "Si, la primera",
        "No, ya poseo otra propiedad",
        "No, ya poseo otra propiedad y deseo venderla próximamente",
      ],
    },
    {
      title: "¿Qué tipo de propiedad desea comprar?",
      subtitle: "Seleccione las opciones que le apliquen:",
      type: "multiple_choice",
      items: [
        "Casa",
        "Apartamento",
        "Local comercial",
        "Warehouse (Almacén, galpón, bodega)",
        "Terreno, parcela",
        "Otra",
      ],
    },
    {
      title: "¿A nombre de qué entidad desea adquirir la propiedad",

      type: "choice",
      items: [
        "A título personal",
        "A través de una persona jurídica (empresa)",
        "No estoy seguro",
        "Otra",
      ],
    },
    {
      title:
        "Si seleccionó la segunda opción (empresa) en el punto anterior, cuál de las siguientes opciones aplican:",
      subtitle: "Seleccione las opciones que le apliquen:",
      type: "multiple_choice",
      items: [
        "La empresa tendría 1 solo socio",
        "La empresa tendría 2 socios, mi esposa y yo",
        "La empresa tendría varios socios, entre los cuales mi esposa, mis hijos y yo",
        "La empresa tendría varios socios, relacionados o no entre sí",
        "La empresa tendría varios socios, entre los cuales una empresa del exterior",
        "Otra",
      ],
    },
    {
      title:
        "¿Posee usted número de identificación tributario (SSN, ITIN) en los Estados Unidos?",

      type: "choice",
      items: ["Si", "No"],
    },
    {
      title:
        "¿Ha presentado usted declaraciones de impuestos federales en los Estados Unidos?",

      type: "choice",
      items: ["Si", "No"],
    },
  ];

  const internalQuestions = [
    {
      title: "¿Puede usted viajar a los Estados Unidos?",
      type: "choice",
      items: ["Si", "No"],
    },
    {
      title: "¿Posee usted cuenta bancaria en los Estados Unidos?",
      type: "choice",
      items: ["Si", "No"],
    },
    {
      title: "¿Tiene hijos menores de 18 años de edad?",
      type: "choice",
      items: ["Si", "No"],
    },
    {
      title:
        "¿Existe alguna otra persona que influya en la toma de la decisión en relación con esta compra?",
      type: "choice",
      items: ["Si", "No"],
    },
    {
      title:
        "Si respondió afirmativamente a la pregunta anterior. ¿Cuál es su relación con usted?",
      type: "input",
      rows: 1,
    },
    {
      title:
        "Si respondió afirmativamente a la pregunta anterior. ¿Desea usted que participe en nuestra próxima reunión vía Zoom?",
      type: "choice",
      items: ["Si", "No"],
    },
  ];

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [notForm, setNotForm] = useState(false);
  const [notCrmId, setNotCrmId] = useState(false);

  const saveChanges = async () => {
    const jsonFe = {
      info_lead: user_form_data?.info_lead,
      notCrmId: notCrmId,
      crm_id: user_form_data?.info_lead?.crm_id,
      form_modify: modifyQuestions,
      form_our: ourQuestions,
    };
    console.log(jsonFe);
    const response = await fetch("/api/updateForm", {
      method: "POST",
      body: JSON.stringify(jsonFe),
    });
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    fetch(`/api/get_lead_form?id=${userReview}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.result == false) {
          setIsLoading(false);
          setNotCrmId(true);
          set_user_form_data({
            info_lead: {
              odoo_id: userReview,
            },
          });
          console.log("no data");
          console.log("data:", data, user_form_data);
        } else {
          if (Object.entries(data.form).length > 1) {
            setNotCrmId(false);
            setIsLoading(false);
            setOriginalQuestions(data?.form ? data?.form : {});
            setModifyQuestions(data?.form_modify ? data?.form_modify : {});
            setOurQuestions(data?.form_our ? data?.form_our : {});
            setRQuestions(data?.form ? data?.form : {});
            set_user_form_data(data);

            console.log("data:", data);
            console.log(
              "Existe Modificaciones",
              data?.form_modify ? true : false
            );
            console.log("Existen propias", data?.form_our ? true : false);
          } else {
            setNotForm(true);
            setIsLoading(false);
            set_user_form_data(data);
            console.log("no data");
            console.log("data:", data);
          }
        }

        setTimeout(() => {
          if (document.readyState === "complete") {
            questions.map((quest, index) => {
              if (quest?.type == "choice") {
                quest?.items.map((item, index2) => {
                  const mditem = document.getElementById(
                    `item-${index}-${index2}-div`
                  );
                  const mdinput =
                    mditem.childNodes[0].childNodes[0].childNodes[0];
                  const mdicon =
                    mditem.childNodes[0].childNodes[0].childNodes[1];

                  if (mdinput.checked) {
                    const rechecked = data?.form_our?.[
                      `item-${String(mdinput.id).split("-")[1]}`
                    ]
                      ? data?.form_our?.[
                          `item-${String(mdinput.id).split("-")[1]}`
                        ][1] == `${String(mdinput.id).split("-")[2]}`
                        ? true
                        : false
                      : data?.form_modify?.[
                          `item-${String(mdinput.id).split("-")[1]}`
                        ]
                      ? data?.form_modify?.[
                          `item-${String(mdinput.id).split("-")[1]}`
                        ][1] == `${String(mdinput.id).split("-")[2]}`
                        ? true
                        : false
                      : false;

                    mdinput.setAttribute("leadEstablished", true);
                    mdinput.setAttribute("rechekched", rechecked);
                    if (rechecked) {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#f50002]");
                    } else {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#110975]");
                    }
                  } else {
                    const checkedLead = data?.form?.[
                      `item-${String(mdinput.id).split("-")[1]}`
                    ]
                      ? data.form[
                          `item-${String(mdinput.id).split("-")[1]}`
                        ][1] == `${String(mdinput.id).split("-")[2]}`
                        ? true
                        : false
                      : false;

                    if (checkedLead) {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#110975]");
                    } else {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#f50002]");
                    }
                  }
                });

                for (let index = 0; index < 2; index++) {
                  const mditem = document.getElementById(
                    `item-last-div-${index}`
                  );

                  const mdinput =
                    mditem.childNodes[0].childNodes[0].childNodes[0];
                  const mdicon =
                    mditem.childNodes[0].childNodes[0].childNodes[1];

                  if (mdinput.checked) {
                    mdinput.setAttribute("leadEstablished", true);
                    mdicon.classList.remove("text-blue-500");
                    mdicon.classList.add("text-[#110975]");
                  } else {
                    mdicon.classList.remove("text-blue-500");
                    mdicon.classList.add("text-[#f50002]");
                  }
                }
              }
            });

            internalQuestions.map((quest, index) => {
              if (quest?.type == "choice") {
                quest?.items.map((item, index2) => {
                  const mditem = document.getElementById(
                    `item-our-${index}-${index2}-div`
                  );
                  const mdinput =
                    mditem.childNodes[0].childNodes[0].childNodes[0];
                  const mdicon =
                    mditem.childNodes[0].childNodes[0].childNodes[1];

                  if (mdinput.checked) {
                    const rechecked = data?.form_our?.[
                      `item-our-${String(mdinput.id).split("-")[1]}`
                    ]
                      ? data?.form_our?.[
                          `item-our-${String(mdinput.id).split("-")[1]}`
                        ][1] == `${String(mdinput.id).split("-")[2]}`
                        ? true
                        : false
                      : data?.form_modify?.[
                          `item-our-${String(mdinput.id).split("-")[1]}`
                        ]
                      ? data?.form_modify?.[
                          `item-our-${String(mdinput.id).split("-")[1]}`
                        ][1] == `${String(mdinput.id).split("-")[2]}`
                        ? true
                        : false
                      : false;

                    mdinput.setAttribute("leadEstablished", true);
                    mdinput.setAttribute("rechekched", rechecked);
                    if (rechecked) {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#f50002]");
                    } else {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#110975]");
                    }
                  } else {
                    const checkedLead = data?.form?.[
                      `item-our-${String(mdinput.id).split("-")[1]}`
                    ]
                      ? data.form[
                          `item-our-${String(mdinput.id).split("-")[1]}`
                        ][1] == `${String(mdinput.id).split("-")[2]}`
                        ? true
                        : false
                      : false;

                    if (checkedLead) {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#110975]");
                    } else {
                      mdicon.classList.remove("text-blue-500");
                      mdicon.classList.add("text-[#f50002]");
                    }
                  }
                });
              }
            });
          }
        }, 100);
      });
  }, []);

  if (isLoading) {
    // ⬅️ si está cargando, mostramos un texto que lo indique
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image
          src="/logopng.png"
          alt=""
          className="w-52 animate-jump-in animate-once animate-duration-1000 animate-delay-1000 animate-ease-out"
          quality={80}
          priority={true}
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <>
      <main>
        {notForm == false ? (
          <>
            <div className="divide-y divide-gray-300 px-5 py-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(
                    "rQuestions",
                    rquestions,
                    "\n",
                    "modifyQuestions",
                    modifyQuestions,
                    "\n",
                    "ourQuestions",
                    ourQuestions,
                    user_form_data
                  );
                }}
              >
                Develop
              </button>
              <div className="flex justify-between pb-2 items-center max-w-7xl mx-auto">
                <div className="flex justify-start items-center space-x-2">
                  <span className="block p-2.5 rounded-full bg-[#110975]"></span>
                  <span className="block">Respondido por el Lead</span>
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <span className="block p-2.5 rounded-full bg-[#7d2181]"></span>
                  <span className="block">Modificado por 305TAX</span>
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <span className="block p-2.5 rounded-full bg-[#f50002]"></span>
                  <span className="block">Respondido por 305TAX</span>
                </div>
              </div>

              {questions.map((quest, index) => (
                <>
                  {quest?.type == "multiple_choice" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            {quest?.title}
                            {quest?.subtitle ? (
                              <>
                                <br />
                                <span className="pl-3 block text-gray-400">
                                  {quest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>
                          <ol className="pl-6 space-y-2 py-4" type="A">
                            {quest?.items.map((item, index2) => (
                              <>
                                <li key={`item-${index}-${index2}`}>
                                  <div className="relative flex items-center space-x-4justify-start">
                                    <div className="min-w-0 order-last flex-1 text-sm">
                                      <label
                                        htmlFor={`item-${index}-${index2}`}
                                        className="font-medium text-gray-black text-lg select-none"
                                      >
                                        {item}
                                      </label>
                                    </div>
                                    <div className="mr-3 flex items-center h-5">
                                      <Checkbox
                                        id={`item-${index}-${index2}`}
                                        name={`item-${index}-${index2}`}
                                        onChange={(e) => {
                                          if (
                                            user_form_data?.form?.[
                                              `item-${index}-${index2}`
                                            ]
                                          ) {
                                            if (
                                              e.target.checked ==
                                              user_form_data?.form?.[
                                                `item-${index}-${index2}`
                                              ]
                                            ) {
                                              delete modifyQuestions[
                                                e.target.name
                                              ];
                                              setModifyQuestions({
                                                ...modifyQuestions,
                                              });
                                            } else {
                                              setModifyQuestions({
                                                ...modifyQuestions,
                                                [e.target.name]:
                                                  e.target.checked,
                                              });
                                            }
                                          } else {
                                            if (e.target.checked == false) {
                                              delete ourQuestions[
                                                e.target.name
                                              ];
                                              setOurQuestions({
                                                ...ourQuestions,
                                              });
                                            } else {
                                              setOurQuestions({
                                                ...ourQuestions,
                                                [e.target.name]:
                                                  e.target.checked,
                                              });
                                            }
                                          }
                                        }}
                                        className={classNames(
                                          user_form_data?.form_our?.[
                                            `item-${index}-${index2}`
                                          ] == true
                                            ? "checked:bg-[#f50002] checked:border-[#f50002]"
                                            : user_form_data?.form?.[
                                                `item-${index}-${index2}`
                                              ]
                                            ? user_form_data?.form?.[
                                                `item-${index}-${index2}`
                                              ] == true
                                              ? "checked:bg-[#110975] checked:border-[#110975] border-[#7d2181] bg-[#7d2181]"
                                              : "checked:bg-[#f50002] checked:border-[#f50002]"
                                            : "checked:bg-[#f50002] checked:border-[#f50002]",

                                          "rounded-full"
                                        )}
                                        defaultChecked={
                                          user_form_data?.form_our?.[
                                            `item-${index}-${index2}`
                                          ]
                                            ? true
                                            : user_form_data?.form?.[
                                                `item-${index}-${index2}`
                                              ]
                                            ? user_form_data?.form_modify?.[
                                                `item-${index}-${index2}`
                                              ] == false
                                              ? false
                                              : user_form_data?.form?.[
                                                  `item-${index}-${index2}`
                                                ] == true
                                              ? true
                                              : false
                                            : false
                                        }
                                      />
                                    </div>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ol>
                        </fieldset>
                      </div>
                    </>
                  ) : quest?.type == "choice" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            <div className="flex justify-start items-start">
                              <span className="block">¿</span>
                              {String(quest?.title).replace("¿", "")}
                            </div>
                            {quest?.subtitle ? (
                              <>
                                <span className="pl-3 block text-gray-400">
                                  {quest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>

                          <ol className=" pl-6 space-y-2 py-4" type="A">
                            {quest?.items.map((item, index2) => (
                              <>
                                <li key={`item-${index}-${index2}`}>
                                  <div
                                    key={`item-${index}-${index2}`}
                                    id={`item-${index}-${index2}-div`}
                                    className="flex items-center"
                                  >
                                    <Radio
                                      id={`item-${index}-${index2}`}
                                      onChange={(e) => {
                                        if (
                                          user_form_data?.form?.[
                                            `item-${index}`
                                          ]
                                        ) {
                                          if (
                                            user_form_data?.form?.[
                                              `item-${index}`
                                            ][1] == index2
                                          ) {
                                            delete modifyQuestions[
                                              e.target.name
                                            ];
                                            setModifyQuestions({
                                              ...modifyQuestions,
                                            });
                                          } else {
                                            setModifyQuestions({
                                              ...modifyQuestions,
                                              [e.target.name]: [
                                                e.target.checked,
                                                index2,
                                              ],
                                            });
                                          }
                                        } else {
                                          setOurQuestions({
                                            ...ourQuestions,
                                            [e.target.name]: [
                                              e.target.checked,
                                              index2,
                                            ],
                                          });
                                        }
                                      }}
                                      className={classNames(
                                        user_form_data?.form_our?.[
                                          `item-${index}`
                                        ]?.[1] == index2
                                          ? user_form_data?.form_our?.[
                                              `item-${index}`
                                            ]?.[0] == true
                                            ? "checked:border-[#f50002]"
                                            : "checked:border-[#f50002]"
                                          : user_form_data?.form_modify?.[
                                              `item-${index}`
                                            ]?.[1] == index2
                                          ? "bg-[#7d2181] checked:border-[#f50002] checked:bg-white"
                                          : user_form_data?.form?.[
                                              `item-${index}`
                                            ]?.[1] == index2
                                          ? user_form_data?.form?.[
                                              `item-${index}`
                                            ]?.[0] == true
                                            ? "bg-[#7d2181] checked:border-[#110975] checked: checked:bg-white"
                                            : ""
                                          : "checked:border-[#f50002]",
                                        // user_form_data?.form_our?.[
                                        //   `item-${index}`
                                        // ]
                                        //   ? "bg-teal-400"
                                        //   : user_form_data?.form?.[
                                        //       `item-${index}`
                                        //     ]
                                        //   ? user_form_data?.form?.[
                                        //       `item-${index}`
                                        //     ][1] == index2
                                        //     ? user_form_data?.form?.[
                                        //         `item-${index}`
                                        //       ][0] == true
                                        //       ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                        //       : ""
                                        //     : "checked:border-[#f50002]"
                                        //   : "checked:border-[#f50002]",

                                        ""
                                      )}
                                      name={`item-${index}`}
                                      defaultChecked={
                                        false
                                        // user_form_data?.form_modify?.[`item-${index}`]?.[1] == index2 ? true : false

                                        // user_form_data?.form_our?.[
                                        //   `item-${index}`
                                        // ]?.[1] == index2
                                        //   ? true
                                        //   : user_form_data?.form_modify?.[
                                        //       `item-${index}`
                                        //     ]?.[1] == index2
                                        //   ? true
                                        //   : user_form_data?.form?.[
                                        //       `item-${index}`
                                        //     ]?.[1] == index2
                                        //   ? user_form_data?.form?.[
                                        //       `item-${index}`
                                        //     ]?.[0] == true
                                        //     ? true
                                        //     : false
                                        //   : false
                                        // user_form_data?.form_our?.[`item-${index}`]?.[1] == index2 ? user_form_data?.form_our?.[`item-${index}`]?.[0] == true ? true : false : user_form_data?.form_modify?.[`item-${index}`]?.[1] == index2 ? user_form_data?.form_modify?.[`item-${index}`]?.[0] == true ? false : true : user_form_data?.form?.[`item-${index}`]?.[1] == index2 ? user_form_data?.form?.[`item-${index}`]?.[0] == true ? true : false : false
                                        // user_form_data?.form_our?.[
                                        //   `item-${index}`
                                        // ]
                                        //   ? true
                                        //   : user_form_data?.form?.[
                                        //       `item-${index}`
                                        //     ]
                                        //   ? user_form_data?.form?.[
                                        //       `item-${index}`
                                        //     ][1] == index2
                                        //     ? user_form_data?.form?.[
                                        //         `item-${index}`
                                        //       ][0] == true
                                        //       ? true
                                        //       : false
                                        //     : false
                                        //   : false
                                      }
                                    />

                                    <label
                                      htmlFor={`item-${index}-${index2}`}
                                      className="ml-3 block text-lg font-medium text-black"
                                    >
                                      {item} {`${index}-${index2}`}
                                    </label>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ol>
                        </fieldset>
                      </div>
                    </>
                  ) : quest?.type == "input" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            {quest?.title}
                            {quest?.subtitle ? (
                              <>
                                <br />
                                <span className="block text-gray-400">
                                  {quest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>

                          <div className="   space-y-2 py-4">
                            <textarea
                              rows={quest?.rows}
                              name={`comment-${index}`}
                              onChange={(e) => {
                                if (
                                  user_form_data?.form?.[`comment-${index}`]
                                ) {
                                  if (
                                    String(e.target.value) !=
                                    String(
                                      user_form_data?.form?.[`comment-${index}`]
                                    )
                                  ) {
                                    e.target.classList.replace(
                                      "text-[#110975]",
                                      "text-[#f50002]"
                                    );
                                    setModifyQuestions({
                                      ...modifyQuestions,
                                      [e.target.name]: e.target.value,
                                    });
                                  } else {
                                    e.target.classList.replace(
                                      "text-[#f50002]",
                                      "text-[#110975]"
                                    );
                                    delete modifyQuestions[e.target.name];
                                    setModifyQuestions({
                                      ...modifyQuestions,
                                    });
                                  }
                                } else {
                                  setOurQuestions({
                                    ...ourQuestions,
                                    [e.target.name]: e.target.value,
                                  });
                                }
                              }}
                              id={`comment-${index}`}
                              className={classNames(
                                user_form_data?.form_our?.[`comment-${index}`]
                                  ? "text-green-400"
                                  : user_form_data?.form?.[`comment-${index}`]
                                  ? "text-[#110975]"
                                  : "text-[#f50002]",

                                "shadow-sm focus:ring-[#110975]  resize-none focus:border-[#110975] focus:text-[#f50002] block w-full text-lg border-gray-400 border rounded-sm"
                              )}
                              defaultValue={
                                user_form_data?.["form"]?.[`comment-${index}`]
                              }
                            />
                          </div>
                        </fieldset>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
            <div className="divide-y bg-[#453aec2c] divide-gray-800 px-5 py-4">
              {internalQuestions.map((iquest, indexi) => (
                <>
                  {iquest?.type == "choice" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            <div className="flex justify-start items-start">
                              <span className="block">¿</span>
                              {String(iquest?.title).replace("¿", "")}
                            </div>
                            {iquest?.subtitle ? (
                              <>
                                <span className="pl-3 block text-gray-400">
                                  {iquest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>

                          <ol className=" pl-6 space-y-2 py-4" type="A">
                            {iquest?.items.map((item, index2) => (
                              <>
                                <li key={`item-our-${indexi}-${index2}`}>
                                  <div
                                    key={`item-our-${indexi}-${index2}`}
                                    id={`item-our-${indexi}-${index2}-div`}
                                    className="flex items-center"
                                  >
                                    <Radio
                                      id={`item-our-${indexi}-${index2}`}
                                      onChange={(e) => {
                                        if (
                                          user_form_data?.form_our?.[
                                            `item-${indexi}`
                                          ]
                                        ) {
                                          if (
                                            user_form_data?.form_our?.[
                                              `item-${indexi}`
                                            ][1] == index2
                                          ) {
                                            delete modifyQuestions[
                                              e.target.name
                                            ];
                                            setModifyQuestions({
                                              ...modifyQuestions,
                                            });
                                          } else {
                                            setModifyQuestions({
                                              ...modifyQuestions,
                                              [e.target.name]: [
                                                e.target.checked,
                                                index2,
                                              ],
                                            });
                                          }
                                        } else {
                                          setOurQuestions({
                                            ...ourQuestions,
                                            [e.target.name]: [
                                              e.target.checked,
                                              index2,
                                            ],
                                          });
                                        }
                                        console.log("tempalte our");
                                      }}
                                      className={classNames(
                                        "bg-yellow-400",
                                        // user_form_data?.form_our?.[
                                        //   `item-our-${indexi}`
                                        // ]
                                        //   ? "bg-teal-400"
                                        //   : user_form_data?.form?.[
                                        //       `item-our-${indexi}`
                                        //     ]
                                        //   ? user_form_data?.form?.[
                                        //       `item-our-${indexi}`
                                        //     ][1] == index2
                                        //     ? user_form_data?.form?.[
                                        //         `item-our-${indexi}`
                                        //       ][0] == true
                                        //       ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                        //       : ""
                                        //     : "checked:border-[#f50002]"
                                        //   : "checked:border-[#f50002]",

                                        ""
                                      )}
                                      name={`item-our-${indexi}`}
                                      defaultChecked={
                                        false
                                        // user_form_data?.form_our?.[
                                        //   `item-our-${indexi}`
                                        // ]
                                        //   ? true
                                        //   : user_form_data?.form?.[
                                        //       `item-our-${indexi}`
                                        //     ]
                                        //   ? user_form_data?.form?.[
                                        //       `item-our-${indexi}`
                                        //     ][1] == index2
                                        //     ? user_form_data?.form?.[
                                        //         `item-our-${indexi}`
                                        //       ][0] == true
                                        //       ? true
                                        //       : false
                                        //     : false
                                        //   : false
                                      }
                                    />

                                    <label
                                      htmlFor={`item-our-${indexi}-${index2}`}
                                      className="ml-3 block text-lg font-medium text-black"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ol>
                        </fieldset>
                      </div>
                    </>
                  ) : iquest?.type == "input" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            {iquest?.title}
                            {iquest?.subtitle ? (
                              <>
                                <br />
                                <span className="block text-gray-400">
                                  {iquest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>

                          <div className="   space-y-2 py-4">
                            <textarea
                              rows={iquest?.rows}
                              name={`comment-our-${indexi}`}
                              onChange={(e) => {
                                if (
                                  user_form_data?.form_our?.[
                                    `comment-our-${indexi}`
                                  ]
                                ) {
                                  if (
                                    String(e.target.value) !=
                                    String(
                                      user_form_data?.form_our?.[
                                        `comment-our-${indexi}`
                                      ]
                                    )
                                  ) {
                                    e.target.classList.replace(
                                      "text-[#110975]",
                                      "text-[#f50002]"
                                    );
                                    setModifyQuestions({
                                      ...modifyQuestions,
                                      [e.target.name]: e.target.value,
                                    });
                                  } else {
                                    e.target.classList.replace(
                                      "text-[#f50002]",
                                      "text-[#110975]"
                                    );
                                    delete modifyQuestions[e.target.name];
                                    setModifyQuestions({
                                      ...modifyQuestions,
                                    });
                                  }
                                } else {
                                  setOurQuestions({
                                    ...ourQuestions,
                                    [e.target.name]: e.target.value,
                                  });
                                }
                                console.log("comment our");
                              }}
                              id={`comment-our-${indexi}`}
                              className={classNames(
                                "text-yellow-400",
                                // user_form_data?.form_our?.[`comment-our-${indexi}`]
                                //   ? "text-green-400"
                                //   : user_form_data?.form?.[`comment-our-${indexi}`]
                                //   ? "text-[#110975]"
                                //   : "text-[#f50002]",

                                "shadow-sm focus:ring-[#110975]  resize-none focus:border-[#110975] focus:text-[#f50002] block w-full text-lg border-gray-400 border rounded-sm"
                              )}
                              defaultValue={
                                false
                                // user_form_data["form"][`comment-our-${indexi}`]
                              }
                            />
                          </div>
                        </fieldset>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
            <div className="border-t border-gray-300 px-5 pt-4">
              <p className="m-0 p-0 py-4 font-semibold text-lg text-justify">
                En 305TAX estamos comprometidos en respetar el trabajo de los
                agentes de bienes raíces, a quienes consideramos nuestros
                aliados.
                <br />
                <br />
                Por este motivo le agradecemos su respuesta a la siguiente
                pregunta:
              </p>
              <div className="">
                <fieldset>
                  <legend className="text-lg font-semibold text-gray-900">
                    ¿Está usted representado(a) por un agente de bienes raíces
                    en Florida?
                  </legend>
                  <ol className=" pl-6 space-y-2 py-4" type="A">
                    <li key={`item-last`}>
                      <div className="relative flex items-center space-x-4justify-start">
                        <div className="min-w-0 order-last flex-1 text-sm">
                          <label
                            htmlFor={`item-last`}
                            className="font-medium text-gray-black text-lg select-none"
                          >
                            Si
                          </label>
                        </div>
                        <div
                          id={"item-last-div-0"}
                          className="mr-3 flex items-center h-5"
                        >
                          <Radio
                            id={`item-last-0`}
                            name={`item-last`}
                            onChange={(e) => handleChangeRadio(e, 0)}
                            className={classNames(
                              user_form_data?.["form"]?.[`item-last`]
                                ? user_form_data?.["form"]?.[`item-last`][1] ==
                                  0
                                  ? user_form_data?.["form"]?.[
                                      `item-last`
                                    ][0] == true
                                    ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                    : " "
                                  : "checked:border-[#f50002]"
                                : "checked:border-[#f50002]",
                              ""
                            )}
                            defaultChecked={
                              user_form_data?.["form"]?.[`item-last`]
                                ? user_form_data?.["form"]?.[`item-last`][1] ==
                                  0
                                  ? user_form_data?.["form"]?.[
                                      `item-last`
                                    ][0] == true
                                    ? true
                                    : false
                                  : false
                                : false
                            }
                          />
                        </div>
                      </div>
                    </li>
                    <li key={`item-last`}>
                      <div className="relative flex items-center space-x-4justify-start">
                        <div className="min-w-0 order-last flex-1 text-sm">
                          <label
                            htmlFor={`item-last`}
                            className="font-medium text-gray-black text-lg select-none"
                          >
                            No
                          </label>
                        </div>
                        <div
                          id={"item-last-div-1"}
                          className="mr-3 flex items-center h-5"
                        >
                          <Radio
                            id={`item-last-1`}
                            name={`item-last`}
                            onChange={(e) => handleChangeRadio(e, 1)}
                            className={classNames(
                              user_form_data?.["form"]?.[`item-last`]
                                ? user_form_data?.["form"]?.[`item-last`][1] ==
                                  1
                                  ? user_form_data?.["form"]?.[
                                      `item-last`
                                    ][0] == true
                                    ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                    : " "
                                  : "checked:border-[#f50002]"
                                : "checked:border-[#f50002]",
                              ""
                            )}
                            defaultChecked={
                              user_form_data?.["form"]?.[`item-last`]
                                ? user_form_data?.["form"]?.[`item-last`][1] ==
                                  1
                                  ? user_form_data?.["form"]?.[
                                      `item-last`
                                    ][0] == true
                                    ? true
                                    : false
                                  : false
                                : false
                            }
                          />
                        </div>
                      </div>
                    </li>
                  </ol>
                </fieldset>
              </div>
              <div className="border-t border-gray-300 py-4">
                <fieldset>
                  <legend className="text-lg font-semibold text-gray-900">
                    Si su respuesta es afirmativa, le agradecemos indicar el
                    nombre y apellido del agente:
                  </legend>

                  <div className=" space-y-2 py-4">
                    <textarea
                      rows={1}
                      name="item-last-comment"
                      id="item-last-comment"
                      onChange={(e) => handleChangeInput(e)}
                      placeholder="Nombre y Apellido"
                      className={classNames(
                        user_form_data?.["form"]?.[`item-last-comment`] ==
                          undefined
                          ? "text-[#f50002]"
                          : "text-[#110975]",
                        "shadow-sm focus:ring-[#110975] resize-none focus:border-[#110975] border block w-full text-lg border-gray-400 rounded-sm"
                      )}
                      defaultValue={
                        user_form_data?.["form"]?.[`item-last-comment`]
                      }
                    />
                  </div>
                </fieldset>
              </div>
              <div className="border-t py-4 border-gray-300">
                <fieldset>
                  <legend className="text-lg font-semibold text-gray-900">
                    Si usted desea hacernos alguna pregunta para su caso
                    particular, hágala en el siguiente campo:
                  </legend>

                  <div className=" pace-y-2 py-4">
                    <textarea
                      rows={6}
                      name="item-comment-optional"
                      id="item-comment-optional"
                      placeholder="Opcional"
                      onChange={(e) => handleChangeInput(e)}
                      className={classNames(
                        user_form_data?.["form"]?.["item-comment-optional"] ==
                          undefined
                          ? "text-[#f50002]"
                          : "text-[#110975]",
                        "shadow-sm focus:ring-[#110975] border resize-none focus:border-[#110975] block w-full text-lg border-gray-400 rounded-sm"
                      )}
                      defaultValue={
                        user_form_data?.["form"]?.["item-comment-optional"]
                      }
                    />
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="fixed block bottom-0 right-0 text-black font-bold my-2.5 mx-2.5">
              {Object.keys(modifyQuestions).length >= 1 ||
              Object.keys(ourQuestions).length >= 1 ? (
                <>
                  <div className="flex justify-end items-center space-x-3">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const response = await saveChanges();
                        console.log("ohg", response);
                      }}
                      class="bg-[#110975] hover:brightness-75 text-white font-bold py-2 px-4 rounded-sm"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRQuestions(originalQuestions);
                      }}
                      class="bg-[#f50002] hover:brightness-75 text-white font-bold py-2 px-4 rounded-sm"
                    >
                      X
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* {Object.keys(modifyQuestions).length >= 1 ||
                ( ? (
                  
                ) : <></>)} */}
            </div>
          </>
        ) : (
          <>
            <div className="divide-y divide-gray-300 px-5 py-4">
              {/* <button onClick={console.log(rquestions, modifyQuestions)}>
                asdasd
              </button> */}
              <span className="block"></span>
              {questions.map((quest, index) => (
                <>
                  {quest?.type == "multiple_choice" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            {quest?.title}
                            {quest?.subtitle ? (
                              <>
                                <br />
                                <span className="pl-3 block text-gray-400">
                                  {quest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>
                          <ol className="   pl-6 space-y-2 py-4" type="A">
                            {quest?.items.map((item, index2) => (
                              <>
                                <li key={`item-${index}-${index2}`}>
                                  <div className="relative flex items-center space-x-4justify-start">
                                    <div className="min-w-0 order-last flex-1 text-sm">
                                      <label
                                        htmlFor={`item-${index}-${index2}`}
                                        className="font-medium text-gray-black text-lg select-none"
                                      >
                                        {item}
                                      </label>
                                    </div>
                                    <div className="mr-3 flex items-center h-5">
                                      <input
                                        id={`item-${index}-${index2}`}
                                        name={`item-${index}-${index2}`}
                                        onChange={(e) => handleChangeChecked(e)}
                                        type="checkbox"
                                        className="focus:ring-[#110975] h-4 w-4 text-[#110975] border-gray-300 rounded-full"
                                      />
                                    </div>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ol>
                        </fieldset>
                      </div>
                    </>
                  ) : quest?.type == "choice" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            <div className="flex justify-start items-start">
                              <span className="block">¿</span>
                              {String(quest?.title).replace("¿", "")}
                            </div>
                            {quest?.subtitle ? (
                              <>
                                <span className="pl-3 block text-gray-400">
                                  {quest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>

                          <ol className="   pl-6 space-y-2 py-4" type="A">
                            {quest?.items.map((item, index2) => (
                              <>
                                <li key={`item-${index}-${index2}`}>
                                  <div
                                    key={`item-${index}-${index2}`}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`item-${index}-${index2}`}
                                      name={`item-${index}`}
                                      type="radio"
                                      onChange={(e) =>
                                        handleChangeRadio(e, index2)
                                      }
                                      className="focus:ring-[#110975] h-4 w-4 text-[#110975] border-gray-300"
                                    />
                                    <label
                                      htmlFor={`item-${index}-${index2}`}
                                      className="ml-3 block text-lg font-medium text-black"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ol>
                        </fieldset>
                      </div>
                    </>
                  ) : quest?.type == "input" ? (
                    <>
                      <div className="w-full py-4">
                        <fieldset>
                          <legend className="text-lg font-semibold text-gray-900">
                            {quest?.title}
                            {quest?.subtitle ? (
                              <>
                                <br />
                                <span className="block text-gray-400">
                                  {quest?.subtitle}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </legend>

                          <div className="   space-y-2 py-4">
                            <textarea
                              rows={quest?.rows}
                              name={`comment-${index}`}
                              onChange={(e) => handleChangeInput(e)}
                              id={`comment-${index}`}
                              className="shadow-sm focus:ring-[#110975] resize-none focus:border-[#110975] block w-full text-lg border-gray-300 rounded-sm"
                            />
                          </div>
                        </fieldset>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
            <div className="border-t border-gray-300 px-5 pt-4">
              <p className="m-0 p-0 py-4 font-semibold text-lg text-justify">
                En 305TAX estamos comprometidos en respetar el trabajo de los
                agentes de bienes raíces, a quienes consideramos nuestros
                aliados.
                <br />
                <br />
                Por este motivo le agradecemos su respuesta a la siguiente
                pregunta:
              </p>
              <div className="">
                <fieldset>
                  <legend className="text-lg font-semibold text-gray-900">
                    ¿Está usted representado(a) por un agente de bienes raíces
                    en Florida?
                  </legend>
                  <ol className=" pl-6 space-y-2 py-4" type="A">
                    <li key={`item-last`}>
                      <div className="relative flex items-center space-x-4justify-start">
                        <div className="min-w-0 order-last flex-1 text-sm">
                          <label
                            htmlFor={`item-last`}
                            className="font-medium text-gray-black text-lg select-none"
                          >
                            Si
                          </label>
                        </div>
                        <div className="mr-3 flex items-center h-5">
                          <input
                            id={`item-last`}
                            name={`item-last`}
                            type="radio"
                            onChange={(e) => handleChangeRadio(e, 0)}
                            className="focus:ring-[#110975] h-4 w-4 text-[#110975] border-gray-300"
                          />
                        </div>
                      </div>
                    </li>
                    <li key={`item-last`}>
                      <div className="relative flex items-center space-x-4justify-start">
                        <div className="min-w-0 order-last flex-1 text-sm">
                          <label
                            htmlFor={`item-last`}
                            className="font-medium text-gray-black text-lg select-none"
                          >
                            No
                          </label>
                        </div>
                        <div className="mr-3 flex items-center h-5">
                          <input
                            id={`item-last`}
                            name={`item-last`}
                            type="radio"
                            onChange={(e) => handleChangeRadio(e, 1)}
                            className="focus:ring-[#110975] h-4 w-4 text-[#110975] border-gray-300 "
                          />
                        </div>
                      </div>
                    </li>
                  </ol>
                </fieldset>
              </div>
              <div className="border-t border-gray-300 py-4">
                <fieldset>
                  <legend className="text-lg font-semibold text-gray-900">
                    Si su respuesta es afirmativa, le agradecemos indicar el
                    nombre y apellido del agente:
                  </legend>

                  <div className=" space-y-2 py-4">
                    <textarea
                      rows={1}
                      name="item-last-comment"
                      id="item-last-comment"
                      onChange={(e) => handleChangeInput(e)}
                      placeholder="Nombre y Apellido"
                      className="shadow-sm focus:ring-[#110975] resize-none focus:border-[#110975] block w-full text-lg border-gray-300 rounded-sm"
                    />
                  </div>
                </fieldset>
              </div>
              <div className="border-t py-4 border-gray-300">
                <fieldset>
                  <legend className="text-lg font-semibold text-gray-900">
                    Si usted desea hacernos alguna pregunta para su caso
                    particular, hágala en el siguiente campo:
                  </legend>

                  <div className=" pace-y-2 py-4">
                    <textarea
                      rows={6}
                      name="item-comment-optional"
                      id="item-comment-optional"
                      placeholder="Opcional"
                      onChange={(e) => handleChangeInput(e)}
                      className="shadow-sm focus:ring-[#110975] resize-none focus:border-[#110975] block w-full text-lg border-gray-300 rounded-sm"
                    />
                  </div>
                </fieldset>
              </div>
            </div>
          </>
        )}
      </main>
      {/* <span className="block">El hash: {userReview} es correcto.</span> */}
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  console.log(query);
  // const userReview = {
  //   user: ,
  //   email: query.e,
  //   lang: query?.l ? query.l : "es_ES",
  // };
  const userReview = query.slug[0];
  // const repo = await res.json()
  return { props: { userReview } };
};

export default Verify;
