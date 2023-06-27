import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Stepper,
  Step,
  Rating,
  Tooltip,
} from "@material-tailwind/react";

import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";
import { StarIcon as UnratedIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Review = ({ userReview }) => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("es");
  const [userCurrent, setUserCurrent] = useState({});
  const [thankState, setThankState] = useState(false);

  const [langPrefered, setLangPrefered] = useState(
    String(userReview?.lang).split("_")[0]
  );

  const [gReview, setGReview] = useState(true);

  const brow = () => {
    if (userReview?.lang) {
      setCurrentLang(String(userReview?.lang).split("_")[0]);
    } else {
      setCurrentLang(String(navigator.language).includes("es") ? "es" : "en");
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [rating, setRating] = useState({
    p0: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
  });

  const handleRatingChanged = (p, newRating) => {
    const updateArray = { ...rating };
    updateArray[p] = newRating;
    setRating(updateArray);
  };

  const reviewSend = async () => {
    const rfetch = await fetch("/api/review_update", {
      method: "POST",
      body: JSON.stringify({
        odoo_id: userCurrent?.id,
        odoo_email: userCurrent?.email,
        rating: rating,
      }),
    });

    const response = await rfetch.json();
    return response;
  };

  const topics = [
    {
      es: "Atención Personalizada | Comunicación Efectiva",
      en: "Personalized Service | Effective Communication",
    },
    {
      es: "Ética | Integridad",
      en: "Ethics | Integrity",
    },
    {
      es: "Competencia Profesional | Confianza en el Trabajo Ejecutado",
      en: "Professional Competence | Confidence in the Work Performed",
    },
    {
      es: "Confidencialidad | Seguridad de la Información",
      en: "Confidentiality | Data Security",
    },
    {
      es: "Amabilidad | Respeto",
      en: "Kindness | Respect",
    },
  ];

  useEffect(() => {
    fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(userReview),
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.result == false) {
        //   return router.push("https://www.305tax.com");
        // }

        setUserCurrent(data.result[0]);
        console.log(data.result[0]);
        brow();
        setIsLoading(false);
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

  const handleGoogleReview = () => {
    const windowFeatures = "left=100,top=100,width=720,height=480";

    const googleWindow = window.open(
      "https://search.google.com/local/writereview?placeid=ChIJ-d6ten652YgRZT7aBTsXuCs",
      "mozillaWindow",
      windowFeatures
    );

    setTimeout(() => {
      setGReview(false);
    }, 10000);
  };

  return (
    <>
      <Head>
        <title>Review</title>
      </Head>
      <main>
        <div className="flex justify-center items-center h-screen w-full">
          <div
            className={classNames(
              thankState == false ? "block" : "hidden",
              "max-w-4xl h-screen mx-auto space-y-8 w-full py-2 px-8"
            )}
          >
            <div className="flex justify-center items-center">
              {currentLang == "es" ? (
                <>
                  <Image
                    src={`/op_es.svg`}
                    alt=""
                    className="w-4 h-4 lg:w-40 lg:h-40"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </>
              ) : (
                <>
                  <Image
                    src={`/op_en.svg`}
                    alt=""
                    className="w-4 h-4 lg:w-40 lg:h-40"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </>
              )}
            </div>
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step
                activeClassName="bg-[#110975]"
                completedClassName="bg-[#110975]"
                onClick={() => setActiveStep(0)}
              >
                1
              </Step>
              <Step
                activeClassName="bg-[#110975]"
                completedClassName="bg-[#110975]"
                onClick={() => {
                  if (
                    rating["p0"] < 1 ||
                    rating["p1"] < 1 ||
                    rating["p2"] < 1 ||
                    rating["p3"] < 1 ||
                    rating["p4"] < 1
                  ) {
                    console.log("Not");
                  } else {
                    setActiveStep(1);
                  }
                }}
              >
                2
              </Step>
            </Stepper>
            <div className="max-w-7xl">
              <div
                className={classNames(
                  activeStep === 0 ? "block" : "hidden",
                  "border space-y-4 rounded-sm border-gray-400 px-6 py-4"
                )}
              >
                <p className="text-base text-justify">
                  {currentLang == "es" ? (
                    <>
                      Sus comentarios nos ayudarán a seguir mejorando nuestros
                      servicios y ayudaría a otros a tomar una decisión
                      informada al elegir a sus asesores fiscales. Califique
                      cada una de las características de nuestro servicio,
                      basándose en la siguiente escala:
                    </>
                  ) : (
                    <>
                      Your comments will help us to continue to improve our
                      services services and help others make an informed
                      decision when choosing their informed decision when
                      choosing their tax advisors. Please rate each of the
                      features of our service, based on the following scale:
                    </>
                  )}
                </p>
                <ul className="flex justify-between items-center pr-2">
                  <li>
                    <Tooltip
                      placement="bottom"
                      content={`${
                        currentLang == "es"
                          ? "Ejecutado muy por debajo de lo esperado"
                          : "Performed well below expected standards"
                      }`}
                    >
                      <div className="space-x-2">
                        <span className="">
                          {currentLang == "es" ? (
                            <>Insatisfactorio</>
                          ) : (
                            <>Unsatisfactory</>
                          )}{" "}
                          1
                        </span>
                        <span className="text-[#FBBC04] text-lg">&#9733;</span>
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip
                      placement="bottom"
                      content={`${
                        currentLang == "es"
                          ? "Ejecutado ligeramente por debajo de lo esperado"
                          : "Performed slightly below expected standards"
                      }`}
                    >
                      <div className="space-x-2">
                        <span className="">
                          {currentLang == "es" ? <>Regular</> : <>Fair</>} 2
                        </span>
                        <span className="text-[#FBBC04] text-lg">&#9733;</span>
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip
                      placement="bottom"
                      content={`${
                        currentLang == "es"
                          ? "Ejecutado adecuadamente"
                          : "Performed adequately"
                      }`}
                    >
                      <div className="space-x-2">
                        <span className="">
                          {currentLang == "es" ? (
                            <>Aceptable</>
                          ) : (
                            <>Acceptable</>
                          )}{" "}
                          3
                        </span>
                        <span className="text-[#FBBC04] text-lg">&#9733;</span>
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip
                      placement="bottom"
                      content={`${
                        currentLang == "es"
                          ? "Ejecutado competentemente"
                          : "Performed competently"
                      }`}
                    >
                      <div className="space-x-2">
                        <span className="">
                          {currentLang == "es" ? (
                            <>Muy bueno</>
                          ) : (
                            <>Very Good</>
                          )}{" "}
                          4
                        </span>
                        <span className="text-[#FBBC04] text-lg">&#9733;</span>
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip
                      placement="bottom"
                      content={`${
                        currentLang == "es"
                          ? "Ejecutado al más alto nivel"
                          : "Performed at the highest level"
                      }`}
                    >
                      <div className="space-x-2">
                        <span className="">
                          {currentLang == "es" ? (
                            <>Excepcional</>
                          ) : (
                            <>Exceptional</>
                          )}{" "}
                          5
                        </span>
                        <span className="text-[#FBBC04] text-lg">&#9733;</span>
                      </div>
                    </Tooltip>
                  </li>
                </ul>
                <hr />
                <div className="w-full grid grid-cols-1 gap-4">
                  {topics?.map((topic, index) => (
                    <>
                      <div className="space-y-4">
                        <span className="block text-base text-center font-bold">
                          {currentLang == "es" ? (
                            <>{topic.es}</>
                          ) : (
                            <>{topic.en}</>
                          )}
                        </span>
                        <div className="flex items-center justify-center space-x-6">
                          {[...Array(5)].map((_, index2) => {
                            const starValue = index2 + 1;
                            const isFilled = starValue <= rating[`p${index}`];

                            return (
                              <Tooltip
                                key={`t${index}-${index2}`}
                                content={`${
                                  index2 === 0
                                    ? currentLang == "es"
                                      ? "Insatisfactorio "
                                      : "Unsatisfactory"
                                    : index2 === 1
                                    ? currentLang == "es"
                                      ? "Regular"
                                      : "Fair"
                                    : index2 === 2
                                    ? currentLang == "es"
                                      ? "Aceptable"
                                      : "Acceptable"
                                    : index2 === 3
                                    ? currentLang == "es"
                                      ? "Muy Bueno"
                                      : "Very Good"
                                    : index2 === 4
                                    ? currentLang == "es"
                                      ? "Excepcional"
                                      : "Exceptional"
                                    : "Undefined"
                                }`}
                              >
                                <span
                                  key={`${index}-${index2}`}
                                  id={`${index}-${index2}`}
                                  placement="bottom"
                                  className={`text-4xl cursor-pointer ${
                                    isFilled
                                      ? "text-[#FBBC04]"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleRatingChanged(`p${index}`, starValue)
                                  }
                                >
                                  &#9733;
                                </span>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div
                className={classNames(
                  activeStep === 1 ? "block" : "hidden",
                  "border space-y-4 rounded-sm border-gray-400 px-10 py-8"
                )}
              >
                <p className="text-lg text-justify">
                  {currentLang == "es" ? (
                    <>
                      Sus comentarios nos ayudarán a seguir mejorando nuestros
                      servicios y ayudaría a otros a tomar una decisión
                      informada al elegir a sus asesores fiscales. Haz click en
                      el siguiente botón, una vez que hayas dejado tu review,
                      regresa a esta pantalla para finalizar el proceso.
                    </>
                  ) : (
                    <>
                      Your feedback will help us continue to improve our
                      services and help others make an informed decision when
                      choosing their tax advisors. Click on the button below,
                      once you have left your review, return to this screen to
                      finish the process.
                    </>
                  )}
                </p>
                <hr />

                <div className="flex justify-center items-center">
                  <button
                    className="bg-[#110975] flex justify-start space-x-4 items-center text-white py-4 px-6 rounded-sm"
                    onClick={handleGoogleReview}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1790.74 1832.56"
                      className="w-10 h-10"
                    >
                      <g data-name="Capa 2">
                        <g data-name="Capa 1">
                          <path
                            fill="#e94335"
                            d="M93.45 509.8c14.28-25.92 27.5-52.51 43-77.67 68.69-111.36 157.67-203.48 266-276.75 81-54.76 168.62-95.56 262.91-121.52 29.74-8.2 60-14.65 90.32-20.58 20.37-4 41.15-6.1 61.82-8.24 18.71-1.94 37.52-3.31 56.31-4Q911-.25 948.14.07c14.33.13 28.65 1.73 43 2.9 13.84 1.13 27.71 2.16 41.48 3.9a892.17 892.17 0 01294.83 91 949.06 949.06 0 01190 128.18c.75.65 1.47 1.34 1.75 1.6Q1385.93 360.87 1252.86 494c-12.67-9.21-25.85-19.39-39.62-28.7a519.85 519.85 0 00-189.07-79.86 450.19 450.19 0 00-50.78-7.29c-22.28-2-44.73-4.18-67-3.53-163.39 4.75-298.85 68.9-405.46 192.87-44 51.17-76 109.46-97.89 173.29-.53 1.55-1.24 3-1.87 4.54l-99-75.74Q228 612.94 154 556.28q-30.32-23.17-60.55-46.48z"
                          ></path>
                          <path
                            fill="#34a753"
                            d="M401.11 1085.93c9.68 23.47 17.9 47.69 29.28 70.3q95.49 189.8 294 266.63a464.57 464.57 0 0085.3 24.2q25.83 4.68 51.94 7.78c32.1 3.84 64.32 3.32 96.53 1.43 11.56-.67 23.13-1.28 34.64-2.43a254.84 254.84 0 0027.94-4.09c26.09-5.56 52.35-10.57 78-17.63 43.39-11.92 84-30.68 122.2-54.39q77.49 60.07 155 120.13 68.61 53.17 137.27 106.31c-20.71 17.53-40.7 36-62.24 52.41-99 75.5-209.85 125.74-331.1 153.36A932.3 932.3 0 01997.78 1829a883.81 883.81 0 01-106.95 3.13c-13-.38-25.92-.44-38.84-1.32-13.33-.9-26.64-2.43-39.91-4-17.37-2.11-34.83-3.9-52-7-42.53-7.75-84.58-17.61-125.8-30.87q-157.5-50.67-287.38-153.09-159.96-126.68-251.39-309.18c-.81-1.63-1.53-3.31-2.3-5l68.93-52.82q73.86-56.61 147.76-113.23 45.57-34.91 91.21-69.69z"
                          ></path>
                          <path
                            fill="#4285f3"
                            d="M1513.22 1604.17Q1444.58 1551 1376 1497.86q-77.51-60-155-120.13c15-11 30.52-21.4 44.89-33.17 51-41.81 88.87-93.63 114.79-154.2a451.94 451.94 0 0026.51-85.37c-.3-.67-.54-1.87-.93-1.92a35.86 35.86 0 00-5-.13h-485.1c-.06-1.33-.16-2.66-.16-4V754c0-1.33.1-2.66.16-4h853.99c3.6 17.51 7.73 34.93 10.65 52.56 3.24 19.64 6.44 39.39 7.72 59.22 1.76 27.38 2.28 54.89 2.22 82.34 0 20.57-1.34 41.18-3 61.7-1.65 20.68-4.18 41.31-6.71 61.91a930.37 930.37 0 01-25 126.81c-27.56 103.09-71.22 198.69-133.22 285.7a819.86 819.86 0 01-106.06 121.3 44.33 44.33 0 01-3.53 2.63z"
                          ></path>
                          <path
                            fill="#fabb05"
                            d="M401.11 1085.93q-45.6 34.85-91.21 69.69-73.9 56.6-147.76 113.26l-68.93 52.82c-11.68-26.82-24.28-53.28-34.85-80.52a841.08 841.08 0 01-45.52-167.72q-4.48-27.15-7.72-54.5c-1.85-16-3.48-32-4-48C.24 942.54-.19 914.1.08 885.68c.19-19.55 1.51-39.1 3-58.6 1-13.31 3.22-26.55 5.05-39.79a915.44 915.44 0 0139.95-168.45 897.79 897.79 0 0143.43-105.57c.58-1.19 1.29-2.31 1.95-3.47q30.24 23.25 60.5 46.48Q228 613 302.13 669.58l99 75.74c-4.18 15.38-9.05 30.62-12.38 46.19a877.153 877.153 0 00-10.59 59.81 415 415 0 00-3.12 87.92c1.7 23.83 3.52 47.79 7.76 71.25 4.64 25.42 12.1 50.31 18.31 75.44z"
                          ></path>
                          <path
                            fill="#5499d0"
                            d="M1770.14 749.9H916.15a20.9 20.9 0 014.45-1q422.46-.06 844.93 0a23.53 23.53 0 014.61 1z"
                          ></path>
                          <path
                            fill="#68a8ce"
                            d="M916.15 1102.9h485.1a35.86 35.86 0 015 .13c.39 0 .63 1.25.93 1.92a37 37 0 00-6.1-1q-239.47-.07-478.93-.09a36.57 36.57 0 01-6-.96z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <span className="block font-semibold">
                      {currentLang == "es" ? (
                        <>Escribir Reseña en Google</>
                      ) : (
                        <>Write Review on Google</>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" pb-6 flex items-center justify-between">
              <Button
                className="bg-[#110975] rounded-sm"
                onClick={handlePrev}
                disabled={isFirstStep}
              >
                <>{currentLang == "es" ? <>Atrás</> : <>Back</>}</>
              </Button>
              <div className="flex justify-start items-center space-x-3">
                <div className="flex justify-center items-center">
                  <Image
                    src="/logopng.png"
                    alt=""
                    className="w-16"
                    quality={80}
                    priority={true}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
                <p className="m-0 p-0 text-center text-sm">
                  &copy; 2023 305TAX. All rights reserved.
                  <br />
                  <a
                    className="text-[#110975]"
                    href="https://www.305tax.com/?utm_source=review"
                  >
                    www.305tax.com
                  </a>
                </p>
              </div>

              <Button
                className="bg-[#110975] rounded-sm"
                onClick={async () => {
                  if (
                    rating["p0"] < 1 ||
                    rating["p1"] < 1 ||
                    rating["p2"] < 1 ||
                    rating["p3"] < 1 ||
                    rating["p4"] < 1
                  ) {
                    console.log("Not");
                  } else {
                    if (isLastStep) {
                      const response = await reviewSend();

                      if (response) {
                        setThankState(true);
                        console.log(response);
                      } else {
                        console.log("ERR", response);
                      }
                    } else {
                      handleNext();
                    }
                  }
                }}
                disabled={
                  activeStep === 1
                    ? gReview == true
                      ? true
                      : false
                    : isLastStep
                }
              >
                {isLastStep ? (
                  <>{currentLang == "es" ? <>Siguiente</> : <>Next</>}</>
                ) : (
                  <>{currentLang == "es" ? <>Siguiente</> : <>Next</>}</>
                )}
              </Button>
            </div>
          </div>
          <div
            className={classNames(
              thankState == true
                ? "flex animate-fade animate-once animate-duration-1000 animate-delay-500"
                : "hidden",
              "w-full h-full bg-white  justify-center items-center "
            )}
          >
            <div className="max-w-7xl w-full mx-auto">
              <div className="space-y-8 mb-12">
                <div className="flex mb-6 justify-center items-center">
                  <Image
                    src="/tky.png"
                    alt=""
                    className="w-72 animate-fade animate-once animate-duration-1000 animate-delay-1000 animate-ease-out"
                    priority={true}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
                <h2 className="font-bold mt-4 text-5xl text-black text-center animate-fade-up animate-once animate-duration-1000 animate-delay-2000 animate-ease-out">
                  ¡{currentLang == "es" ? <>Gracias</> : <>Thank you</>},{" "}
                  {String(userCurrent.name)
                    .toLowerCase()
                    .split(" ")[0]
                    .charAt(0)
                    .toUpperCase() +
                    String(userCurrent.name)
                      .toLowerCase()
                      .split(" ")[0]
                      .substring(1, 100)}
                  !
                </h2>
                <p className="text-lg max-w-4xl text-center mx-auto">
                  {currentLang == "es" ? (
                    <>Nos has dado una puntuación promedio de</>
                  ) : (
                    <>You have given us an average rating of</>
                  )}
                  :{" "}
                  <span className="font-bold">
                    {" "}
                    {(
                      Object.values(rating).reduce((a, b) => a + b, 0) / 5
                    ).toFixed(1)}{" "}
                    <span className="text-[#FBBC04] text-lg">&#9733;</span>
                  </span>
                  .{" "}
                  {currentLang == "es" ? (
                    <>
                      Le damos las gracias por elegir a 305TAX como sus asesores
                      tributarios y por permitirnos ayudarle con sus necesidades
                      fiscales. Su opinión hecha en Google la mostraremos en
                      nuestra página principal en breves.
                    </>
                  ) : (
                    <>
                      We thank you for choosing 305TAX as your tax advisors and
                      for allowing us to help you with your tax needs. Your
                      feedback made on Google will be displayed on our home page
                      shortly.
                    </>
                  )}
                </p>
              </div>
              <div className="space-y-4">
                <div class="flex items-center justify-center  mb-4 lg:mb-0 space-x-6 md:order-2">
                  <a
                    href="https://wa.me/+13052395500/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-[#110975] "
                  >
                    <span class="sr-only">WhatsApp</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/305TAX/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-[#110975] "
                  >
                    <span class="sr-only">Facebook</span>
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/305TAXofficial/"
                    class="text-gray-500 hover:text-[#110975] "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="sr-only">Instagram</span>
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://twitter.com/305tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-[#110975] "
                  >
                    <span class="sr-only">Twitter</span>
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" class="text-gray-500 hover:text-[#110975] ">
                    <span class="sr-only">LinkedIn</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </a>
                  <a href="#" class="text-gray-500 hover:text-[#110975] ">
                    <span class="sr-only">Telegram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@305tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-[#110975] "
                  >
                    <span class="sr-only">Youtube</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                    </svg>
                  </a>
                </div>
                <footer className="text-center flex justify-center items-center space-x-3.5 text-sm">
                  <div>
                    <span className="block">
                      &copy; 2023 305TAX. All Rights Reserved.
                    </span>
                    <div className="flex justify-center items-center pt-3">
                      <Image
                        src="/logopng.png"
                        alt=""
                        className="w-10 animate-fade animate-once animate-duration-1000 animate-delay-1000 animate-ease-out"
                        priority={true}
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  console.log(query);
  const userReview = {
    user: query.slug[0],
    email: query.e,
    lang: query.l,
  };
  // const repo = await res.json()
  return { props: { userReview } };
};

export default Review;
