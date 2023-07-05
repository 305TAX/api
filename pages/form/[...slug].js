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

  const [isLoading, setIsLoading] = useState(true);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // fetch(`/api/verify_email?hash=${userReview}`, {
    //   method: "POST",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.result == true) {
    //       const { innerWidth: width, innerHeight: height } = window;
    //       setDimensions({
    //         width,
    //         height,
    //       });
    //       setIsLoading(false);
    //     }

    //   });
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
        <div className="bg-red-400 w-full h-full">Hello world{userReview}</div>
      </main>
      {/* <span className="block">El hash: {userReview} es correcto.</span> */}
    </>
  );
};

// const Review = ({ userReview }) => {

//   const [langPrefered, setLangPrefered] = useState(
//     String(userReview?.lang).split("_")[0]
//   );

//   const [gReview, setGReview] = useState(true);

//   const brow = () => {
//     if (userReview?.lang) {
//       setCurrentLang(String(userReview?.lang).split("_")[0]);
//     } else {
//       setCurrentLang(String(navigator.language).includes("es") ? "es" : "en");
//     }
//   };

//   const [activeStep, setActiveStep] = useState(0);
//   const [isLastStep, setIsLastStep] = useState(false);
//   const [isFirstStep, setIsFirstStep] = useState(false);

//   const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
//   const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

//   const [isReviewSend, setIsReviewSend] = useState(false);

//   const [rating, setRating] = useState({
//     p0: 0,
//     p1: 0,
//     p2: 0,
//     p3: 0,
//     p4: 0,
//   });

//   const handleRatingChanged = (p, newRating) => {
//     const updateArray = { ...rating };
//     updateArray[p] = newRating;
//     setRating(updateArray);
//   };

//   const reviewSend = async () => {
//     const rfetch = await fetch("/api/review_update", {
//       method: "POST",
//       body: JSON.stringify({
//         odoo_id: userCurrent?.id,
//         odoo_email: userCurrent?.email,
//         rating: rating,
//       }),
//     });

//     const response = await rfetch.json();
//     setIsReviewSend(true);
//     return response;
//   };

//   const topics = [
//     {
//       es: "Atención Personalizada | Comunicación Efectiva",
//       en: "Personalized Service | Effective Communication",
//     },
//     {
//       es: "Ética | Integridad",
//       en: "Ethics | Integrity",
//     },
//     {
//       es: "Competencia Profesional | Confianza en el Trabajo Ejecutado",
//       en: "Professional Competence | Confidence in the Work Performed",
//     },
//     {
//       es: "Confidencialidad | Seguridad de la Información",
//       en: "Confidentiality | Data Security",
//     },
//     {
//       es: "Amabilidad | Respeto",
//       en: "Kindness | Respect",
//     },
//   ];

//   const handleGoogleReview = () => {
//     const windowFeatures = "left=100,top=100,width=720,height=480";

//     const googleWindow = window.open(
//       "https://search.google.com/local/writereview?placeid=ChIJ-d6ten652YgRZT7aBTsXuCs",
//       "mozillaWindow",
//       windowFeatures
//     );

//     setTimeout(() => {
//       setGReview(false);
//     }, 10000);
//   };

//   return (
//     <>
//       <Head>
//         <title>Review</title>
//       </Head>
//       <main>
//         <div className="flex justify-center items-center h-screen w-full">
//           <div
//             className={classNames(
//               thankState == false ? "block" : "hidden",
//               "max-w-4xl h-screen mx-auto space-y-8 w-full py-2 px-8"
//             )}
//           >
//             <div className="flex justify-center items-center">
//               {currentLang == "es" ? (
//                 <>
//                   <Image
//                     src={`/op_es.svg`}
//                     alt=""
//                     className="w-32 h-32 lg:w-40 lg:h-40"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Image
//                     src={`/op_en.svg`}
//                     alt=""
//                     className="w-4 h-4 lg:w-40 lg:h-40"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                   />
//                 </>
//               )}
//             </div>
//             <Stepper
//               activeStep={activeStep}
//               isLastStep={(value) => setIsLastStep(value)}
//               isFirstStep={(value) => setIsFirstStep(value)}
//             >
//               <Step
//                 activeClassName="bg-[#110975]"
//                 completedClassName="bg-[#110975]"
//                 onClick={() => setActiveStep(0)}
//               >
//                 1
//               </Step>
//               <Step
//                 activeClassName="bg-[#110975]"
//                 completedClassName="bg-[#110975]"
//                 onClick={() => {
//                   if (
//                     rating["p0"] < 1 ||
//                     rating["p1"] < 1 ||
//                     rating["p2"] < 1 ||
//                     rating["p3"] < 1 ||
//                     rating["p4"] < 1
//                   ) {
//                     console.log("Not");
//                   } else {
//                     setActiveStep(1);
//                   }
//                 }}
//               >
//                 2
//               </Step>
//             </Stepper>
//             <div className="max-w-7xl">
//               <div
//                 className={classNames(
//                   activeStep === 0 ? "block" : "hidden",
//                   "border space-y-4 rounded-sm border-gray-400 px-6 py-4"
//                 )}
//               >
//                 <div>
//                   <h2 className="text-4xl font-bold uppercase text-center">
//                     {currentLang == "es" ? <>Paso</> : <>Step</>} 1
//                   </h2>
//                   <p className="text-base text-justify">
//                     {currentLang == "es" ? (
//                       <>
//                         Sus comentarios nos ayudarán a seguir mejorando nuestros
//                         servicios y ayudaría a otros a tomar una decisión
//                         informada al elegir a sus asesores fiscales. Califique
//                         cada una de las características de nuestro servicio,
//                         basándose en la siguiente escala:
//                       </>
//                     ) : (
//                       <>
//                         Your comments will help us to continue to improve our
//                         services services and help others make an informed
//                         decision when choosing their informed decision when
//                         choosing their tax advisors.
//                         <br />
//                         <br />
//                         Please rate each of the features of our service, based
//                         on the following scale:
//                       </>
//                     )}
//                   </p>
//                 </div>

//                 <ul className="grid grid-cols-1 pb-4 sm:flex justify-between items-center sm:pr-2">
//                   <li>
//                     <Tooltip
//                       placement="bottom"
//                       content={`${
//                         currentLang == "es"
//                           ? "Ejecutado muy por debajo de lo esperado"
//                           : "Performed well below expected standards"
//                       }`}
//                     >
//                       <div className="space-x-2 flex justify-between items-center">
//                         <span className="block">
//                           {currentLang == "es" ? (
//                             <>Insatisfactorio</>
//                           ) : (
//                             <>Unsatisfactory</>
//                           )}
//                         </span>
//                         <div className="flex justify-start items-center space-x-1">
//                           <span className="block">1</span>
//                           <span className="text-[#FBBC04] block text-lg">
//                             &#9733;
//                           </span>
//                         </div>
//                       </div>
//                     </Tooltip>
//                   </li>
//                   <li>
//                     <Tooltip
//                       placement="bottom"
//                       content={`${
//                         currentLang == "es"
//                           ? "Ejecutado ligeramente por debajo de lo esperado"
//                           : "Performed slightly below expected standards"
//                       }`}
//                     >
//                       <div className="space-x-2 flex justify-between items-center">
//                         <span className="block">
//                           {currentLang == "es" ? <>Regular</> : <>Fair</>}
//                         </span>
//                         <div className="flex justify-start items-center space-x-1">
//                           <span className="block">2</span>
//                           <span className="text-[#FBBC04] block text-lg">
//                             &#9733;
//                           </span>
//                         </div>
//                       </div>
//                     </Tooltip>
//                   </li>
//                   <li>
//                     <Tooltip
//                       placement="bottom"
//                       content={`${
//                         currentLang == "es"
//                           ? "Ejecutado adecuadamente"
//                           : "Performed adequately"
//                       }`}
//                     >
//                       <div className="space-x-2 flex justify-between items-center">
//                         <span className="block">
//                           {currentLang == "es" ? (
//                             <>Aceptable</>
//                           ) : (
//                             <>Acceptable</>
//                           )}
//                         </span>
//                         <div className="flex justify-start items-center space-x-1">
//                           <span className="block">3</span>
//                           <span className="text-[#FBBC04] block text-lg">
//                             &#9733;
//                           </span>
//                         </div>
//                       </div>
//                     </Tooltip>
//                   </li>
//                   <li>
//                     <Tooltip
//                       placement="bottom"
//                       content={`${
//                         currentLang == "es"
//                           ? "Ejecutado competentemente"
//                           : "Performed competently"
//                       }`}
//                     >
//                       <div className="space-x-2 flex justify-between items-center">
//                         <span className="block">
//                           {currentLang == "es" ? (
//                             <>Muy bueno</>
//                           ) : (
//                             <>Very Good</>
//                           )}
//                         </span>
//                         <div className="flex justify-start items-center space-x-1">
//                           <span className="block">4</span>
//                           <span className="text-[#FBBC04] block text-lg">
//                             &#9733;
//                           </span>
//                         </div>
//                       </div>
//                     </Tooltip>
//                   </li>
//                   <li>
//                     <Tooltip
//                       placement="bottom"
//                       content={`${
//                         currentLang == "es"
//                           ? "Ejecutado al más alto nivel"
//                           : "Performed at the highest level"
//                       }`}
//                     >
//                       <div className="space-x-2 flex justify-between items-center">
//                         <span className="block">
//                           {currentLang == "es" ? (
//                             <>Excepcional</>
//                           ) : (
//                             <>Exceptional</>
//                           )}
//                         </span>
//                         <div className="flex justify-start items-center space-x-1">
//                           <span className="block">5</span>
//                           <span className="text-[#FBBC04] block text-lg">
//                             &#9733;
//                           </span>
//                         </div>
//                       </div>
//                     </Tooltip>
//                   </li>
//                 </ul>
//                 <hr />
//                 <div className="w-full grid grid-cols-1 gap-4">
//                   {topics?.map((topic, index) => (
//                     <>
//                       <div className="space-y-4">
//                         <span className="block text-base text-center font-bold">
//                           {currentLang == "es" ? (
//                             <>{topic.es}</>
//                           ) : (
//                             <>{topic.en}</>
//                           )}
//                         </span>
//                         <div className="flex items-center justify-between sm:justify-center sm:space-x-6">
//                           {[...Array(5)].map((_, index2) => {
//                             const starValue = index2 + 1;
//                             const isFilled = starValue <= rating[`p${index}`];

//                             return (
//                               <Tooltip
//                                 key={`t${index}-${index2}`}
//                                 content={`${
//                                   index2 === 0
//                                     ? currentLang == "es"
//                                       ? "Insatisfactorio "
//                                       : "Unsatisfactory"
//                                     : index2 === 1
//                                     ? currentLang == "es"
//                                       ? "Regular"
//                                       : "Fair"
//                                     : index2 === 2
//                                     ? currentLang == "es"
//                                       ? "Aceptable"
//                                       : "Acceptable"
//                                     : index2 === 3
//                                     ? currentLang == "es"
//                                       ? "Muy Bueno"
//                                       : "Very Good"
//                                     : index2 === 4
//                                     ? currentLang == "es"
//                                       ? "Excepcional"
//                                       : "Exceptional"
//                                     : "Undefined"
//                                 }`}
//                               >
//                                 <span
//                                   key={`${index}-${index2}`}
//                                   id={`${index}-${index2}`}
//                                   placement="bottom"
//                                   className={`text-4xl cursor-pointer ${
//                                     isFilled
//                                       ? "text-[#FBBC04]"
//                                       : "text-gray-300"
//                                   }`}
//                                   onClick={() =>
//                                     handleRatingChanged(`p${index}`, starValue)
//                                   }
//                                 >
//                                   &#9733;
//                                 </span>
//                               </Tooltip>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </>
//                   ))}
//                 </div>
//               </div>
//               <div
//                 className={classNames(
//                   activeStep === 1 ? "block" : "hidden",
//                   "border space-y-4 rounded-sm border-gray-400 px-10 py-8"
//                 )}
//               >
//                 <div>
//                   <h2 className="text-4xl font-bold uppercase text-center">
//                     {currentLang == "es" ? <>Paso</> : <>Step</>} 2
//                   </h2>
//                   <p className="text-lg text-justify">
//                     {/* {currentLang == "es" ? (
//                     <>

//                     </>
//                   ) : (
//                     <>

//                     </>
//                   )} */}
//                   </p>
//                 </div>

//                 <hr />

//                 <div className="flex justify-center items-center">
//                   <button
//                     className="bg-[#110975] flex justify-start space-x-4 items-center text-white py-4 px-6 rounded-sm"
//                     onClick={handleGoogleReview}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 1790.74 1832.56"
//                       className="w-10 h-10"
//                     >
//                       <g data-name="Capa 2">
//                         <g data-name="Capa 1">
//                           <path
//                             fill="#e94335"
//                             d="M93.45 509.8c14.28-25.92 27.5-52.51 43-77.67 68.69-111.36 157.67-203.48 266-276.75 81-54.76 168.62-95.56 262.91-121.52 29.74-8.2 60-14.65 90.32-20.58 20.37-4 41.15-6.1 61.82-8.24 18.71-1.94 37.52-3.31 56.31-4Q911-.25 948.14.07c14.33.13 28.65 1.73 43 2.9 13.84 1.13 27.71 2.16 41.48 3.9a892.17 892.17 0 01294.83 91 949.06 949.06 0 01190 128.18c.75.65 1.47 1.34 1.75 1.6Q1385.93 360.87 1252.86 494c-12.67-9.21-25.85-19.39-39.62-28.7a519.85 519.85 0 00-189.07-79.86 450.19 450.19 0 00-50.78-7.29c-22.28-2-44.73-4.18-67-3.53-163.39 4.75-298.85 68.9-405.46 192.87-44 51.17-76 109.46-97.89 173.29-.53 1.55-1.24 3-1.87 4.54l-99-75.74Q228 612.94 154 556.28q-30.32-23.17-60.55-46.48z"
//                           ></path>
//                           <path
//                             fill="#34a753"
//                             d="M401.11 1085.93c9.68 23.47 17.9 47.69 29.28 70.3q95.49 189.8 294 266.63a464.57 464.57 0 0085.3 24.2q25.83 4.68 51.94 7.78c32.1 3.84 64.32 3.32 96.53 1.43 11.56-.67 23.13-1.28 34.64-2.43a254.84 254.84 0 0027.94-4.09c26.09-5.56 52.35-10.57 78-17.63 43.39-11.92 84-30.68 122.2-54.39q77.49 60.07 155 120.13 68.61 53.17 137.27 106.31c-20.71 17.53-40.7 36-62.24 52.41-99 75.5-209.85 125.74-331.1 153.36A932.3 932.3 0 01997.78 1829a883.81 883.81 0 01-106.95 3.13c-13-.38-25.92-.44-38.84-1.32-13.33-.9-26.64-2.43-39.91-4-17.37-2.11-34.83-3.9-52-7-42.53-7.75-84.58-17.61-125.8-30.87q-157.5-50.67-287.38-153.09-159.96-126.68-251.39-309.18c-.81-1.63-1.53-3.31-2.3-5l68.93-52.82q73.86-56.61 147.76-113.23 45.57-34.91 91.21-69.69z"
//                           ></path>
//                           <path
//                             fill="#4285f3"
//                             d="M1513.22 1604.17Q1444.58 1551 1376 1497.86q-77.51-60-155-120.13c15-11 30.52-21.4 44.89-33.17 51-41.81 88.87-93.63 114.79-154.2a451.94 451.94 0 0026.51-85.37c-.3-.67-.54-1.87-.93-1.92a35.86 35.86 0 00-5-.13h-485.1c-.06-1.33-.16-2.66-.16-4V754c0-1.33.1-2.66.16-4h853.99c3.6 17.51 7.73 34.93 10.65 52.56 3.24 19.64 6.44 39.39 7.72 59.22 1.76 27.38 2.28 54.89 2.22 82.34 0 20.57-1.34 41.18-3 61.7-1.65 20.68-4.18 41.31-6.71 61.91a930.37 930.37 0 01-25 126.81c-27.56 103.09-71.22 198.69-133.22 285.7a819.86 819.86 0 01-106.06 121.3 44.33 44.33 0 01-3.53 2.63z"
//                           ></path>
//                           <path
//                             fill="#fabb05"
//                             d="M401.11 1085.93q-45.6 34.85-91.21 69.69-73.9 56.6-147.76 113.26l-68.93 52.82c-11.68-26.82-24.28-53.28-34.85-80.52a841.08 841.08 0 01-45.52-167.72q-4.48-27.15-7.72-54.5c-1.85-16-3.48-32-4-48C.24 942.54-.19 914.1.08 885.68c.19-19.55 1.51-39.1 3-58.6 1-13.31 3.22-26.55 5.05-39.79a915.44 915.44 0 0139.95-168.45 897.79 897.79 0 0143.43-105.57c.58-1.19 1.29-2.31 1.95-3.47q30.24 23.25 60.5 46.48Q228 613 302.13 669.58l99 75.74c-4.18 15.38-9.05 30.62-12.38 46.19a877.153 877.153 0 00-10.59 59.81 415 415 0 00-3.12 87.92c1.7 23.83 3.52 47.79 7.76 71.25 4.64 25.42 12.1 50.31 18.31 75.44z"
//                           ></path>
//                           <path
//                             fill="#5499d0"
//                             d="M1770.14 749.9H916.15a20.9 20.9 0 014.45-1q422.46-.06 844.93 0a23.53 23.53 0 014.61 1z"
//                           ></path>
//                           <path
//                             fill="#68a8ce"
//                             d="M916.15 1102.9h485.1a35.86 35.86 0 015 .13c.39 0 .63 1.25.93 1.92a37 37 0 00-6.1-1q-239.47-.07-478.93-.09a36.57 36.57 0 01-6-.96z"
//                           ></path>
//                         </g>
//                       </g>
//                     </svg>
//                     <span className="block font-semibold">
//                       {currentLang == "es" ? (
//                         <>Dejar una Reseña en Google</>
//                       ) : (
//                         <>Leave a Review on Google</>
//                       )}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className=" pb-6 flex items-center justify-between">
//               <Button
//                 className="bg-[#110975] rounded-sm"
//                 onClick={handlePrev}
//                 disabled={isFirstStep}
//               >
//                 <>{currentLang == "es" ? <>Atrás</> : <>Back</>}</>
//               </Button>
//               <div className="hidden sm:flex justify-start items-center space-x-3">
//                 <div className="flex justify-center items-center">
//                   <Image
//                     src="/logopng.png"
//                     alt=""
//                     className="w-16"
//                     quality={80}
//                     priority={true}
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                   />
//                 </div>
//                 <p className="m-0 p-0 text-center text-sm">
//                   &copy; 2023 305TAX. All rights reserved.
//                   <br />
//                   <a
//                     className="text-[#110975]"
//                     href="https://www.305tax.com/?utm_source=review"
//                   >
//                     www.305tax.com
//                   </a>
//                 </p>
//               </div>

//               <Button
//                 className="bg-[#110975] rounded-sm"
//                 onClick={async () => {
//                   if (
//                     rating["p0"] < 1 ||
//                     rating["p1"] < 1 ||
//                     rating["p2"] < 1 ||
//                     rating["p3"] < 1 ||
//                     rating["p4"] < 1
//                   ) {
//                     console.log("Not");
//                   } else {
//                     if (activeStep === 0) {
//                       if (isReviewSend == false) {
//                         const response = await reviewSend();

//                         if (response) {
//                           handleNext();
//                           console.log("review send");
//                         } else {
//                           console.log("err", response);
//                         }
//                       } else {
//                         handleNext();
//                       }
//                     } else if (isLastStep) {
//                       setThankState(true);
//                       console.log("thank");
//                     } else {
//                       handleNext();
//                     }

//                     // if (isLastStep) {
//                     //

//                     //   if (response) {
//                     //     setThankState(true);
//                     //     console.log(response);
//                     //   } else {
//                     //     console.log("ERR", response);
//                     //   }
//                     // } else {
//                     //   handleNext();
//                     // }
//                   }
//                 }}
//                 disabled={
//                   activeStep === 1
//                     ? gReview == true
//                       ? true
//                       : false
//                     : isLastStep
//                 }
//               >
//                 {isLastStep ? (
//                   <>{currentLang == "es" ? <>Siguiente</> : <>Next</>}</>
//                 ) : (
//                   <>{currentLang == "es" ? <>Siguiente</> : <>Next</>}</>
//                 )}
//               </Button>
//             </div>
//             <div className="block sm:hidden pb-8 space-y-2">
//               <div className="flex justify-center items-center">
//                 <Image
//                   src="/logopng.png"
//                   alt=""
//                   className="w-16"
//                   quality={80}
//                   priority={true}
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                 />
//               </div>
//               <p className="m-0 p-0 text-center text-sm">
//                 &copy; 2023 305TAX. All rights reserved.
//                 <br />
//                 <a
//                   className="text-[#110975]"
//                   href="https://www.305tax.com/?utm_source=review"
//                 >
//                   www.305tax.com
//                 </a>
//               </p>
//             </div>
//           </div>
//           <div
//             className={classNames(
//               thankState == true
//                 ? "flex animate-fade animate-once animate-duration-1000 animate-delay-500"
//                 : "hidden",
//               "w-full h-full bg-white  justify-center items-center "
//             )}
//           >
//             <div className="max-w-7xl w-full mx-auto">
//               <div className="space-y-8 mb-12">
//                 <div className="flex mb-6 justify-center items-center">
//                   <Image
//                     src="/tky.png"
//                     alt=""
//                     className="w-72 animate-fade animate-once animate-duration-1000 animate-delay-1000 animate-ease-out"
//                     priority={true}
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                   />
//                 </div>
//                 <h2 className="font-bold mt-4 text-5xl text-black text-center animate-fade-up animate-once animate-duration-1000 animate-delay-2000 animate-ease-out">
//                   ¡{currentLang == "es" ? <>Gracias</> : <>Thank you</>},{" "}
//                   {String(userCurrent.name)
//                     .toLowerCase()
//                     .split(" ")[0]
//                     .charAt(0)
//                     .toUpperCase() +
//                     String(userCurrent.name)
//                       .toLowerCase()
//                       .split(" ")[0]
//                       .substring(1, 100)}
//                   !
//                 </h2>
//                 <p className="text-lg max-w-4xl text-center mx-auto">
//                   {currentLang == "es" ? (
//                     <>Nos ha dado una puntuación promedio de</>
//                   ) : (
//                     <>You have given us an average rating of</>
//                   )}
//                   :{" "}
//                   <span className="font-bold">
//                     {" "}
//                     {(
//                       Object.values(rating).reduce((a, b) => a + b, 0) / 5
//                     ).toFixed(1)}{" "}
//                     <span className="text-[#FBBC04] text-lg">&#9733;</span>
//                   </span>
//                   .{" "}
//                   {currentLang == "es" ? (
//                     <>
//                       <br />
//                       Le damos las gracias por elegir a 305TAX como sus asesores
//                       tributarios. <br />
//                       Su opinión expresada en Google la mostraremos en breve en
//                       nuestra página principal.
//                     </>
//                   ) : (
//                     <>
//                       <br />
//                       We thank you for choosing 305TAX as your tax advisors.{" "}
//                       <br />
//                       Your Google Review will be displayed on our home page
//                       shortly.
//                     </>
//                   )}
//                 </p>
//               </div>
//               <div className="space-y-4">
//
//                 <footer className="text-center flex justify-center items-center space-x-3.5 text-sm">
//                   <div>
//                     <span className="block">
//                       &copy; 2023 305TAX. All Rights Reserved.
//                     </span>
//                     <div className="flex justify-center items-center pt-3">
//                       <Image
//                         src="/logopng.png"
//                         alt=""
//                         className="w-10 animate-fade animate-once animate-duration-1000 animate-delay-1000 animate-ease-out"
//                         priority={true}
//                         width={0}
//                         height={0}
//                         sizes="100vw"
//                       />
//                     </div>
//                   </div>
//                 </footer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

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
