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
  const [originalQuestions, setOriginalQuestions] = useState({});

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
      title: "¿Posee usted cuenta bancaria en los Estados Unidos?",
      type: "choice",
      items: ["Si", "No"],
    },
    {
      title: "¿Puede usted viajar a los Estados Unidos?",
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
    {
      title: "¿Tiene hijos?",
      type: "choice",
      items: ["Si", "No"],
    },
    {
      title: "¿Cuáles son sus edades?",
      subtitle: "Separe con comas las diferentes edades",
      type: "input",
      rows: 1,
    },
  ];

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [notForm, setNotForm] = useState(false);

  useEffect(() => {
    fetch(`/api/get_lead_form?id=${userReview}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (Object.entries(data.form).length > 1) {
          setIsLoading(false);
          setOriginalQuestions(data.form);
          setRQuestions(data.form);
          set_user_form_data(data);

          console.log("data:", data);
        } else {
          setNotForm(true);
          setIsLoading(false);
          set_user_form_data(data);
          console.log("data:", data);
        }
      });

    setTimeout(() => {
      if (document.readyState === "complete") {
        questions.map((quest, index) => {
          if (quest?.type == "choice") {
            quest?.items.map((item, index2) => {
              const mditem = document.getElementById(
                `item-${index}-${index2}-div`
              );
              const mdinput = mditem.childNodes[0].childNodes[0].childNodes[0];
              const mdicon = mditem.childNodes[0].childNodes[0].childNodes[1];

              if (mdinput.checked) {
                mdinput.setAttribute("leadEstablished", true);
                mdicon.classList.remove("text-blue-500");
                mdicon.classList.add("text-[#110975]");
              } else {
                mdicon.classList.remove("text-blue-500");
                mdicon.classList.add("text-[#f50002]");
              }
            });

            for (let index = 0; index < 2; index++) {
              const mditem = document.getElementById(`item-last-div-${index}`);

              const mdinput = mditem.childNodes[0].childNodes[0].childNodes[0];
              const mdicon = mditem.childNodes[0].childNodes[0].childNodes[1];

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
                `item-internal-${index}-${index2}-div`
              );
              const mdinput = mditem.childNodes[0].childNodes[0].childNodes[0];
              const mdicon = mditem.childNodes[0].childNodes[0].childNodes[1];

              if (mdinput.checked) {
                mdinput.setAttribute("leadEstablished", true);
                mdicon.classList.remove("text-blue-500");
                mdicon.classList.add("text-[#110975]");
              } else {
                mdicon.classList.remove("text-blue-500");
                mdicon.classList.add("text-[#f50002]");
              }
            });

            // for (let index = 0; index < 2; index++) {
            //   const mditem = document.getElementById(`item-last-div-${index}`);

            //   const mdinput = mditem.childNodes[0].childNodes[0].childNodes[0];
            //   const mdicon = mditem.childNodes[0].childNodes[0].childNodes[1];

            //   if (mdinput.checked) {
            //     mdinput.setAttribute("leadEstablished", true);
            //     mdicon.classList.remove("text-blue-500");
            //     mdicon.classList.add("text-[#110975]");
            //   } else {
            //     mdicon.classList.remove("text-blue-500");
            //     mdicon.classList.add("text-[#f50002]");
            //   }
            // }
          }
        });
      }
    }, 200);
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
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(rquestions);
                }}
              >
                asdasd
              </button> */}
              <div className="flex justify-between pb-2 items-center max-w-7xl mx-auto">
                <div className="flex justify-start items-center space-x-2">
                  <span className="block p-2.5 rounded-full bg-[#110975]"></span>
                  <span className="block">Establecido por el Lead</span>
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <span className="block p-2.5 rounded-full bg-[#7d2181]"></span>
                  <span className="block">
                    Modificado por un agente de 305TAX
                  </span>
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <span className="block p-2.5 rounded-full bg-[#f50002]"></span>
                  <span className="block">
                    Establecido por un agente de 305TAX
                  </span>
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
                                        onChange={(e) => handleChangeChecked(e)}
                                        className={classNames(
                                          user_form_data["form"][
                                            `item-${index}-${index2}`
                                          ] == true
                                            ? "checked:bg-[#110975] checked:border-[#110975] border-[#7d2181] bg-[#7d2181]"
                                            : "checked:bg-[#f50002] checked:border-[#f50002]",
                                          "rounded-full"
                                        )}
                                        defaultChecked={
                                          user_form_data["form"][
                                            `item-${index}-${index2}`
                                          ] == true
                                            ? true
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
                                      onChange={(e) =>
                                        handleChangeRadio(e, index2)
                                      }
                                      className={classNames(
                                        user_form_data["form"][`item-${index}`]
                                          ? user_form_data["form"][
                                              `item-${index}`
                                            ][1] == index2
                                            ? user_form_data["form"][
                                                `item-${index}`
                                              ][0] == true
                                              ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                              : " "
                                            : "checked:border-[#f50002]"
                                          : "checked:border-[#f50002]",
                                        ""
                                      )}
                                      name={`item-${index}`}
                                      defaultChecked={
                                        user_form_data["form"][`item-${index}`]
                                          ? user_form_data["form"][
                                              `item-${index}`
                                            ][1] == index2
                                            ? user_form_data["form"][
                                                `item-${index}`
                                              ][0] == true
                                              ? true
                                              : false
                                            : false
                                          : false
                                      }
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
                              defaultValue={
                                user_form_data["form"][`comment-${index}`]
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
                      <div className="w-full  py-4">
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
                            {iquest?.items.map((item, indexi2) => (
                              <>
                                <li key={`item-internal-${indexi}-${indexi2}`}>
                                  <div
                                    key={`item-internal-${indexi}-${indexi2}`}
                                    id={`item-internal-${indexi}-${indexi2}-div`}
                                    className="flex items-center"
                                  >
                                    <Radio
                                      id={`item-internal-${indexi}-${indexi2}`}
                                      onChange={(e) =>
                                        handleChangeRadio(e, indexi2)
                                      }
                                      className={classNames(
                                        user_form_data["form"][
                                          `item-internal-${indexi}`
                                        ]
                                          ? user_form_data["form"][
                                              `item-internal-${indexi}`
                                            ][1] == index2
                                            ? user_form_data["form"][
                                                `item-internal-${indexi}`
                                              ][0] == true
                                              ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                              : " "
                                            : "checked:border-[#f50002]"
                                          : "checked:border-[#f50002]",
                                        ""
                                      )}
                                      name={`item-internal-${indexi}`}
                                      defaultChecked={
                                        user_form_data["form"][
                                          `item-internal${indexi}`
                                        ]
                                          ? user_form_data["form"][
                                              `item-internal-${indexi}`
                                            ][1] == index2
                                            ? user_form_data["form"][
                                                `item-internal-${indexi}`
                                              ][0] == true
                                              ? true
                                              : false
                                            : false
                                          : false
                                      }
                                    />

                                    <label
                                      htmlFor={`item-internal-${indexi}-${indexi2}`}
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
                              name={`comment-internal-${indexi}`}
                              onChange={(e) => handleChangeInput(e)}
                              id={`comment-internal-${indexi}`}
                              className="shadow-sm focus:ring-[#110975] resize-none focus:border-[#110975] block w-full text-lg border-gray-300 rounded-sm"
                              defaultValue={
                                user_form_data["form"][
                                  `comment-internal-${indexi}`
                                ]
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
                              user_form_data["form"][`item-last`]
                                ? user_form_data["form"][`item-last`][1] == 0
                                  ? user_form_data["form"][`item-last`][0] ==
                                    true
                                    ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                    : " "
                                  : "checked:border-[#f50002]"
                                : "checked:border-[#f50002]",
                              ""
                            )}
                            defaultChecked={
                              user_form_data["form"][`item-last`]
                                ? user_form_data["form"][`item-last`][1] == 0
                                  ? user_form_data["form"][`item-last`][0] ==
                                    true
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
                              user_form_data["form"][`item-last`]
                                ? user_form_data["form"][`item-last`][1] == 1
                                  ? user_form_data["form"][`item-last`][0] ==
                                    true
                                    ? "bg-[#7d2181] checked:border-[#110975] checked:bg-white"
                                    : " "
                                  : "checked:border-[#f50002]"
                                : "checked:border-[#f50002]",
                              ""
                            )}
                            defaultChecked={
                              user_form_data["form"][`item-last`]
                                ? user_form_data["form"][`item-last`][1] == 1
                                  ? user_form_data["form"][`item-last`][0] ==
                                    true
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
                      className="shadow-sm focus:ring-[#110975] resize-none focus:border-[#110975] block w-full text-lg border-gray-300 rounded-sm"
                      defaultValue={user_form_data["form"][`item-last-comment`]}
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
                      defaultValue={
                        user_form_data["form"]["item-comment-optional"]
                      }
                    />
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="fixed block bottom-0 right-0 my-2.5 mx-2.5">
              {JSON.stringify(originalQuestions) ==
              JSON.stringify(rquestions) ? (
                <></>
              ) : (
                <>
                  {/* <a
                    href="#seeVideo"
                    className="relative w-full transform hover:scale-[1.03] hover:transition duration-300 ease-in-out sm:w-auto text-lg font-bold text-black "
                  >
                    <Image
                      className="w-52 bg-cover drop-shadow-sm"
                      src="/images/blue-button.png"
                      alt="Quickbooks"
                      loading="lazy"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <span class="absolute w-full text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="block text-lg">
                        {currentLang == "es" ? (
                          <>Informe GRATIS</>
                        ) : (
                          <>FREE Report</>
                        )}
                      </span>
                    </span>
                  </a> */}
                  <div className="flex justify-end items-center space-x-2">
                    <button class=" relative hover:brightness-75 text-white font-bold py-2 px-4 rounded-sm">
                      <img
                        className="w-44 bg-cover drop-shadow-sm"
                        src="https://305tax.com/images/blue-button.png"
                        alt=""
                      />
                      <span class="absolute w-full text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="block text-lg">
                          Guardar Cambios
                        </span>
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRQuestions(originalQuestions);
                      }}
                      class="bg-[#f50002] rounded-full hover:brightness-75 text-white font-bold py-2 px-4"
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="divide-y divide-gray-300 px-5 py-4">
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(rquestions);
                }}
              >
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
