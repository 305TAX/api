import clientPromise from "../../lib/mongodb";

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const oReviews = [
    {
      author_name: "Gabriel Jiménez",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTteXseVXoaXWZXXoURrAuDbwEP4Kwxhl7-M75G0UIlgc=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Maravilloso Servicio! Sumamente atentos, que gratificante encontrarse con profesionales que se toman el tiempo de explicarte pacientemente el porque de las cosas y agregarle valor a su trabajo.",
      older: 38,
    },
    {
      author_name: "Ana Felicia Herrera",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtefVEWP4g1z40BQPn27bQ1WpAvyb6eCxF5i65OD2s4P=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Este servicio realmente ha simplificado mi vida, su responsabilidad y la confianza que me han brindado a través de los años no tiene precio, Gracias por tener todos mis taxes y los de mis familiares correctamente al día cada año ¡Lo recomiendo a todos!",
      older: 37,
    },
    {
      author_name: "Manuel Alejandro Espin Verde",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtfVi1DNqPJQlmAFQBnGjhK7Tx4YFl3xpLwbvKaePyz-=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excelentes profesionales altamente capacitados en el area de contabilidad y impuestos 1000% recomendados.",
      older: 36,
    },
    {
      author_name: "Aly Reyes",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMQQII5wGFXg9YUgRRePYuyDQeSLEB65MumusGgEwd6qzA=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "súper recomendado ! profesionalismo",
      older: 35,
    },
    {
      author_name: "Luca Salvadore",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMTTtqg9HLJvTpy0_OkN1_CNMPUEEtrbWEYjRe3msX_2drmf=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "Excelente atencion. Lo recomiendo sin reservas",
      older: 34,
    },
    {
      author_name: "Jorge Luis Moros Gonzalez",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMTE3U48osRZOKbh2VioEhN_ZaqcPF-drpjl0s5Gm3_U3dgb=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "Con 305TAX siempre tengo una atención personalizada para mi caso, orientándome efectivamente en materia de declaración de impuesto personal, empresa con alta ética profesional y gente con conocimiento sólido sobre la materia. A través de su web tienes acceso privado a tu información. Empresa con personal de trato respetuoso y cordial. Por lo anterior expuesto, no tengo dudas en recomendarlos.",
      older: 33,
    },
    {
      author_name: "Herman Finol",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMT3ErNYGXBV_jZkjbAXsBxT-HDj1ey74tty1DwgyJYqKVQ=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "We are clients of 305TAX because they are law-abiding, responsible with the handling of information, they are technically very capable and they are people with a cordial and very humane treatment.",
      older: 32,
    },
    {
      author_name: "Giselle Reyes",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMTnY7nr7vkRP5y08t2A3yz5v8cpzeQk95Wb-NTMMZ6Swjg=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "El equipo de 305 Tax es conocedor de las leyes fiscales, hace seguimiento a sus clientes de manera oportuna además la atención al cliente es siempre amable y profesional. 100% recomendado.",
      older: 31,
    },
    {
      author_name: "ALOL ALOL",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtfDMnU6Rwqv3jz3uh-vbN0L1M5vYrln6M3wNvoLMMU=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "Excelente servicio.",
      older: 31,
    },
    {
      author_name: "Maria Gabriela Barreto Araque",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTteUuonhvcBgoO5weP4Hw4u5aUJdW1IN73mpXMICwyjK=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "Excelentes y recomendado ampliamente!",
      older: 29,
    },
    {
      author_name: "Marjorie Cucalon",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTteu1LK14ZoflhR0J5z-_68OxizImjja4hrcRi1R_5u8=w68-h68-p-rp-mo-br100",
      rating: "5",
      text: "Excellent service, very knowledgeable group. Follow up with the clients. Highly recommended.",
      older: 28,
    },
    {
      author_name: "Giselly Ruiz",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTte7WVLUufZa4G0Em-fwpnfhYRWyrmUTZgvnNzIv0uHu=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Estamos complacidos por los servicios recibidos por 305 Tax. Hemos trabajado jutos de hace 3 anos, los recomendamos altamente como acesores tributarios y consulturia contable.",
      older: 27,
    },
    {
      author_name: "Carlos Gil",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtcVisJslhUN4LO2v-4JLSzmiPBj9dbruU8WuiQOcDAz=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excelente servicio y confianza 👍🏽",
      older: 26,
    },
    {
      author_name: "Elsie Toro",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMQ_l0gLNJbuBK9OeWQEMwhsuXGkOmUaSzlqakfMKCnuvKs=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Prestan un servicio personalizado y profesional, por lo que me han brindado confianza de trabajar con 305TAX desde hace varios años. Lo recomiendo ampliamente ",
      older: 25,
    },
    {
      author_name: "Elio Natera",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtd3c2oBY1HbocxSsHZ3sot-BVnIixt0SkKWH5DWAemC=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excelente atención y servicio, la experiencia en 305TAX, liderizada por Marco Dieci y su equipo de trabajo; su asesoría en el ámbito fiscal en USA, es excelente, lo cual nos brinda tranquilidad para nuestra actividad comercial, los recomiendo ampliamente!!!",
      older: 24,
    },
    {
      author_name: "Sandra Perez",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtcVr7J03B2LS4h46Ij2MsF19jsmGdpySG_cI8XRIM9o=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excellent costumer service",
      older: 23,
    },
    {
      author_name: "galaxy 524 export",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtf8vQ9ftCRskq0lW90k1C4x60UfVOK-rb4-cl5xNUcO=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excelente atencion, muy Profesionales, con calidad y calidez de servicio, recomendados 100%",
      older: 22,
    },
    {
      author_name: "Alfredo Natera",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtfu2uJPO1l8ijKmu0tPNPbBRDJSXY6oUpT5qFCWDlqU=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excelente calidad de servicio, muy profesionales, los recomiendo ampliamente.",
      older: 21,
    },
    {
      author_name: "charlie schwab",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTteCtLZpsqiYDHSYCIuZEGex5OqOclRhBtzYfC64vqLo=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Apoyo uncondicional.",
      older: 20,
    },
    {
      author_name: "Richard Gollarza",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMSaTCva5YfjwUYaA4D1SxU_-jwkDTKqYgB8i60aptxX9g=w75-h75-p-rp-mo-ba2-br100",
      rating: "5",
      text: "Este es un lugar donde llegue por casualidad luego de una mala experiencia con mi contador anterior y luego de haber trabajado con Marco y su oficina lo puedo recomendar públicamente, su labor nos ha ahorrado dinero y dolores de cabezas. Si necesitan una firma contable que además se especialice en bienes raíces, esta es su mejor opción.",
      older: 19,
    },
    {
      author_name: "carlos barrientos",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtcrg_c94NIiIYXfvTvZGbqDdEds9U1oujS5SXYm_sc=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excelente persona,profesionalmente  no creo nadie mejor,su enorme calidad humana ayuda a sus clientes con excelentes consejos y orientacion segura para los problemas que se tienen en especial para aquellos que como yo no estamos familiarizados con las leyes y regulaciones americanas",
      older: 18,
    },
    {
      author_name: "Juan Ramon Prieto Vena",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMR2vV5NV8-4Is-Tx-81-3Y3ZJE8yHMCvtd4pBYc9CmCU6U=w75-h75-p-rp-mo-ba4-br100",
      rating: "5",
      text: "Excepcional ayuda, gente que sabe lo que hace con una vocación de servicio espectacular.",
      older: 17,
    },
    {
      author_name: "Rafael Blanco",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMSL06G-u-EV3lPg_5CwXgU7pywdECpuKhef2mThA-MtVP8=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Excellent service. High level of professionalism and technical knowledge. Proactivity to solve problems and allow their customers to have optimal results. The best Tax and Accounting service. Highly recommended.",
      older: 16,
    },
    {
      author_name: "Gloria Hurtado",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMROx8teNiKGFnLUK27wklw3_Lh5MA-H5aR4TdKF_gjttqQG=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Los mejores!  Excelente servicio y asesoría contable. Muy honestos",
      older: 15,
    },
    {
      author_name: "Magaly Barreto A.",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMQ-TH9jzGY5bDukqcphY8239TuQvplvV9fX9uSSAcsatz4=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Trato excelente y resultados rápidos y confiables dado el conocimiento  y actualización permanente de las normas  formularios del IRS",
      older: 14,
    },
    {
      author_name: "Jose Vicente Garcia",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtfwCZdVS69oGkVcL14FYAdturLznd47qk07EbAtpvjK=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Marco y su equipo son excepcionales con el trabajo que hacen. El alivio de contar con personas confiables y profesionales para asesorarte con todo lo relacionado al tema fiscal en USA, no tiene precio. Además la interacción personalizada que ofrecen es espectacular. Sin duda 305 Tax es muy recomendado!!",
      older: 13,
    },
    {
      author_name: "Olga García",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtccYU8NcMEbIaENbBjXOj0D14FhIDlgvBgbYX5gU4Rt=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Un servicio muy profesional, confiable y experto!!!",
      older: 12,
    },
    {
      author_name: "Luis Antonio",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtc5iEgyDtt-ZpvJdK3J0BN1onZnJTmaVi4xdm-d-nmS=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "El nivel de conocimiento y experiencia es impresionante. Nos da mucha confianza trabajar con ellos.",
      older: 11,
    },
    {
      author_name: "maria de lapaz de medina",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtfG9ebV71VhwAAVB9K5HCQPD4-Luag0k_LzChqwqmf_=w75-h75-p-rp-mo-br100",
      rating: "5",
      text: "Profesionales 5 estrellas, conocen de la A a la Z su profesión, generando en mi una gran seguridad por su honestidad. Lo recomiendo con los ojos cerrados",
      older: 10,
    },
    {
      author_name: "leonardo diaz",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMSbtzyEF7ILYPO2ZdJFhUFSLnD7S_q6QQ_D0B9YKfwg6y4=s40-c-rp-mo-br100",
      rating: "5",
      text: "Muy Profesionales , me gusta la manera en que trabajan, y megusta su maquina Fotocopiadora",
      older: 10,
    },
    {
      author_name: "Mayra Blel",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMSbtzyEF7ILYPO2ZdJFhUFSLnD7S_q6QQ_D0B9YKfwg6y4=s40-c-rp-mo-br100",
      rating: "5",
      text: "Excelente servicio !! Muy profesional..",
      older: 9,
    },
    {
      author_name: "Yenitze Molina",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMR-hSd2fUkXDpEf8eQQmDJPIRb5UlA5QEQOoDA7sS9BzAY=s40-c-rp-mo-br100",
      rating: "5",
      text: "Outstanding service for the last years doing business with 305 TAX. Very professional, great place, extremely efficient, fast and everyone is always friendly.",
      older: 8,
    },
    {
      author_name: "Corina Oramas",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtcU1E4PlfS4ZF6L859SzcBsLPh0kNt3RI2L8MGNn5Y3=s40-c-rp-mo-br100",
      rating: "5",
      text: "Amaizing service!,Marco is very professional and prepared. The new office is very comfortable and easy to get. We recommend it a lot!",
      older: 7,
    },
    {
      author_name: "Oscar Alejandro",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMSJtYoWdCDJ10thQo4DsbWvIjBV1kxRsoX8H_F1_gdBBl0=s40-c-rp-mo-br100",
      rating: "5",
      text: "Excelente atención, siempre muy profesionales, y honestos. Recomendados 100%",
      older: 6,
    },
    {
      author_name: "Manolo",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMSxFzBXzYsadWnRVZxaAGDGDqMKDkOYGhUP7blw91JmeA=s40-c-rp-mo-br100",
      text: "305 Tax has been my family&apos;s trusted tax advisor for years. Thank you for your kind services and the personal your personal touch.",
      rating: "5",
      older: 5,
    },
    {
      author_name: "Cristal Avilera",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMRd2B175fiXw8rJu3KiZwbj-VbKtP92hpdlOJtiOzUp61yk=s40-c-rp-mo-br100",
      rating: "5",
      older: 4,
      text: "Excelente atención y profesionalismo. Lo recomiendo 100%",
    },
    {
      author_name: "Yes You Can Venezuela",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AAcHTtcRaW--OOLVDCMPfaq9xsrpRZr2h-GhlZADvr9krcj8=s40-c-rp-mo-br100",
      rating: "5",
      older: 3,
      text: "Excelente servicios, rapidos , eficientes y honestos",
    },
    {
      author_name: "Jc Performance",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMTwmF9RNwGGkuGwMaOCN2u50dD8JnoOWmd5bQSqyzUarOc=s64-c-rp-mo-ba4-br100",
      rating: "5",
      older: 2,
      text: "excelente atención ,fácil comunicación y muy profesionales en sus servicio los recomiendo ampliamente",
    },
    {
      author_name: "Iliana Luyando",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/AD_cMMR2THv_4gHD8-UcVpP0URljMFSrk1cerHLHuZnaCXS4C4s6=s64-c-rp-mo-ba4-br100",
      rating: "5",
      older: 1,
      text: "Excelente servicio. Atención personalizada Recomendado cien por ciento",
    },
  ];

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ-d6ten652YgRZT7aBTsXuCs&reviews_no_translations=false&language=es&fields=user_ratings_total,reviews,rating&reviews_sort=newest&rating=4&key=AIzaSyAB9iUjmC4HSRWInSEkqbaYR-0ldgOz2YQ`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!data) return res.status(403).json({ notFound: true });

  const reviews = data?.result.reviews;
  const listReviews = [];

  listReviews.concat(oReviews);

  const filterReviews = reviews?.sort((a, b) => b?.time - a?.time);

  const array1 = [1, 2, 3];
  const lp = filterReviews.concat(oReviews);

  try {
    const client = await clientPromise;
    const db = client.db("users_reviews");
    const getusers = await db.collection("users").find({}).toArray();

    return res.status(200).json({
      user_ratings_total: data?.result.user_ratings_total,
      rating: data?.result.rating,
      reviews: lp,
      our_reviews: getusers,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: error });
  }

  //   .then((response) => response.json())
  //   .then((data) => {
}
