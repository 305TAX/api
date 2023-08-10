// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import NextCors from "nextjs-cors";

import ytch from "yt-channel-info";

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const payload = {
    channelId: "UCUFkqYAOcbPkUwg-KIKEDmg", // Required

    sortBy: "newest",
    channelIdType: 0,
  };

  ytch
    .getChannelVideos(payload)
    .then((response) => {
      if (!response.alertMessage) {
        return res.json(response);
      } else {
        console.log("Channel could not be found.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
