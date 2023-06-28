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
