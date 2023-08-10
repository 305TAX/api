import Odoo from "odoo-xmlrpc";
import { odooConfig } from "../../lib/odooConfig";
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

  let odoo = new Odoo(odooConfig);

  odoo.connect((err) => {
    if (err) {
      return console.log(err);
    }

    var inParams = [];
    inParams.push([]);
    inParams.push([
      "x_name",
      "x_studio_video_id",
      "x_studio_description",
      "x_studio_published_date",
      "x_studio_tags",
      "x_studio_keywords",
    ]); //fields
    var params = [];
    params.push(inParams);

    // 4- Read
    odoo.execute_kw("x_videos", "search_read", params, async (err, value) => {
      if (err) return console.log("ERROR:", err);

      ytch
        .getChannelVideos(payload)
        .then((response) => {
          if (!response.alertMessage) {
            var resultItems = response?.items;

            resultItems.forEach((element) => {
              var item = value.find(
                (elm) =>
                  String(elm?.x_studio_video_id) == String(element?.videoId)
              );
              if (item) {
                element.description = item?.x_studio_description;
                element.publishedDate = item?.x_studio_published_date;
                element.tags = item?.x_studio_tags;
                element.keywords = item?.x_studio_keywords;
              }
            });

            return res.json({
              items: resultItems,
            });
          } else {
            console.log("Channel could not be found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}
