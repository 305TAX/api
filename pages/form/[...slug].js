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
                    mdinput.setAttribute("leadEstablished", true);
                    mdicon.classList.remove("text-blue-500");
                    mdicon.classList.add("text-[#110975]");
                  } else {
                    mdicon.classList.remove("text-blue-500");
                    mdicon.classList.add("text-[#f50002]");
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
                    `item-internal-${index}-${index2}-div`
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
        <span className="block">Inhabilitado, realizando cambios.</span>
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
