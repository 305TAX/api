import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Review = ({ userReview }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [userRequest, setUserRequest] = useState();

  // console.log(router.query.slug, router.query.e);

  // useEffect(() => {
  //   fetch("/api/review")
  //     .then((response) => response.json())
  //     .then((dog) => {
  //       setUserReview(dog);
  //       setUserRequest(
  //         JSON.stringify({
  //           user: router.query?.slug,
  //           email: router.query?.e,
  //         })
  //       );
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   // ⬅️ si está cargando, mostramos un texto que lo indique
  //   return (
  //     <div className="App">
  //       <h1>
  //         Cargando... {router.query.slug}
  //         {router.query.e}
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <h1>Listo</h1>
      <p>{JSON.stringify(userReview)}</p>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  console.log(query);
  const userReview = {
    user: query.slug[0],
    email: query.e,
  };
  // const repo = await res.json()
  return { props: { userReview } };
};

export default Review;
