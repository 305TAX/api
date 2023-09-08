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
  const [thankState, setThankState] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await fetch(`/api/crm/verifyEmail?hash=${userReview}`);
      const result = await response.json();

      if (data?.result == true) {
        const { innerWidth: width, innerHeight: height } = window;
        setDimensions({
          width,
          height,
        });

        setIsLoading(false);

        setTimeout(() => {
          window.location.replace("https://305tax.com");
        }, 30000);
      }
    };

    verifyEmail();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Image
          src="/logopng.png"
          alt=""
          className="w-52 animate-jump-in animate-once animate-duration-1000 animate-delay-100 animate-ease-out"
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
        <div className="flex justify-center items-center h-screen w-full">
          <div
            className={
              "block max-w-[61rem] h-full mx-auto space-y-8 w-full py-6 px-8 animate-fade animate-once animate-duration-1000 animate-delay-500"
            }
          >
            <div class="relative">
              <Image
                className="w-full h-auto brightness-75"
                src={"/miami.webp"}
                alt={`Dummy`}
                loading="lazy"
                width={0}
                height={0}
                sizes="100vw"
              />
              <h1 class="absolute text-6xl text-white drop-shadow-md uppercase w-full text-center font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Felicitaciones <br />
                <span className="text-3xl">
                  usted ha completado el proceso de registro
                </span>
              </h1>
            </div>

            <div className="max-w-7xl">
              <div
                className={
                  "block border space-y-4 rounded-sm border-gray-400 px-10 py-8"
                }
              >
                <p className="text-justify text-lg">
                  Consulte su buzón de correo electrónico para recibir el
                  informe. Si el correo electrónico no aparece de inmediato,
                  asegúrese de revisar su carpeta de correo no deseado.
                  <br />
                  <br />
                  <span className="font-bold text-[#110975]">
                    Es importante que lea el informe detenidamente.
                  </span>{" "}
                  Si desea aclarar cualquier duda que tenga sobre su contenido u
                  otro tema para su caso particular, escríbanos por{" "}
                  <a
                    href="https://api.whatsapp.com/send?phone=13052395500&text=Hola%20profesionales%20de%20305TAX%2C%20le%C3%AD%20el%20Informe%20de%2012%20Preguntas%20Frecuentes%20Que%20Se%20Hacen%20Los%20Extranjeros%20Al%20Invertir%20En%20Bienes%20Ra%C3%ADces%20En%20Florida%20y%20quisera%20hacer%20una%20cita%20para%20aclarar%20algunos%20puntos%20sobre%20su%20contenido%20para%20mi%20caso%20particular.%0A%0AMuchas%20gracias."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline text-[#25D366] font-bold space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-4 h-4 stroke-2 fill-[#25D366]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                    <span className="block">WhatsApp</span>
                  </a>
                  , uno de nuestros profesionales expertos lo ayudará
                  cordialmente.
                  <br />
                </p>
                <div className="sm:flex items-center justify-center sm:space-x-8 rounded-sm">
                  <a
                    href={
                      "https://api.whatsapp.com/send?phone=13052395500&text=Hola.%20Estoy%20interesado%20en%20hablar%20con%20un%20asesor%20de%20305TAX."
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center space-x-3 justify-center px-5 py-3 border border-transparent text-lg font-bold rounded-sm text-black bg-[#25D366] hover:bg-indigo-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>

                    <span className="block text-sm sm:text-lg">
                      {currentLang == "es" ? (
                        <>Quiero Contactarlos</>
                      ) : (
                        <>Let&apos;s Talk</>
                      )}
                    </span>
                  </a>
                </div>
                <p className="p-0 pt-2.5 text-lg text-center m-0">
                  Lo invitamos a seguirnos en nuestras redes sociales:
                </p>
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
                <p className="p-0 pt-2.5 text-lg text-center m-0">
                  Cordiales saludos.
                </p>
              </div>
            </div>
            <div className=" pb-6 flex items-center justify-center">
              <div className="hidden sm:block space-y-3">
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
                  3625 NW 82 Ave Suite 311, Doral, FL 33166 |{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#110975]"
                    href="https://wa.me/+13052395500/"
                  >
                    +1 (305) 239-5500
                  </a>{" "}
                  |{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#110975]"
                    href="mailto:info@305tax.com"
                  >
                    info@305tax.com
                  </a>
                  <br />
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
            </div>
            <div className="block sm:hidden pb-8 space-y-2">
              <div className="flex justify-center items-center">
                <Image
                  src="/iamges/logopng.png"
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
                3625 NW 82 Ave Suite 311, Doral, FL 33166 |{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#110975]"
                  href="https://wa.me/+13052395500/"
                >
                  +1 (305) 239-5500
                </a>{" "}
                |{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#110975]"
                  href="mailto:info@305tax.com"
                >
                  info@305tax.com
                </a>
                <br />
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
            <div className="w-full">
              <Confetti
                tweenDuration={2000}
                numberOfPieces={40}
                colors={["#110975", "#f50002", "#ffc60a"]}
                width={dimensions.width}
                height={dimensions.height}
              />
            </div>
          </div>
        </div>
      </main>
      {/* <span className="block">El hash: {userReview} es correcto.</span> */}
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const userReview = query.slug[0];

  return { props: { userReview } };
};

export default Verify;
