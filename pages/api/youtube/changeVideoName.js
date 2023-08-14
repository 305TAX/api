// import Odoo from "odoo-xmlrpc";
import clientPromise from "../../../lib/mongodb";

// import { odooConfig } from "@/lib/odooConfig";
import NextCors from "nextjs-cors";
// import ytch from "yt-channel-info";
// import credentialsJson from "../../lib/credentials.json";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

var SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"];

export default async function handler(req, res) {
  //NEXT CORS
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const youtube = google.youtube("v3");
  const query = req.query;

  const VIDEO_ID = String(query?.v).trim();
  const VIDEO_TITLE = String(query?.title).trim();

  if (!VIDEO_ID || !VIDEO_ID == "")
    return res.json({
      status: 204,
      statusText: "VIDEO_ID undefined or spaces contain.",
    });

  if (!VIDEO_TITLE || !VIDEO_TITLE == "")
    return res.json({
      status: 204,
      statusText: "VIDEO_TITLE undefined or spaces contain.",
    });

  const client = await clientPromise;
  const db = client.db("users_reviews");
  const getconfig = await db.collection("config").find({}).toArray();
  const googleConfig = getconfig[1];

  const token = googleConfig?.googleToken;
  const credentialsJson = googleConfig?.googleCredentials;

  function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    oauth2Client.credentials = token;
    callback(oauth2Client);
  }

  const makeAuthCall = (auth) => {
    youtube.videos.list(
      {
        auth: auth,
        id: VIDEO_ID,
        part: "id,snippet,statistics",
      },
      (err, response) => {
        if (err) {
          console.log(`some shit went wrong ${err}`);
          return;
        }

        if (response.data.items[0]) {
          updateVideoTitle(response.data.items[0], auth);
        }
      }
    );
  };

  const updateVideoTitle = (video, auth) => {
    let views = video.statistics.viewCount;
    let likes = video.statistics.likeCount;
    let commentCount = video.statistics.commentCount;

    video.snippet.title = VIDEO_TITLE;

    youtube.videos.update(
      {
        auth: auth,
        part: "snippet,statistics",
        resource: video,
      },
      (err, response) => {
        if (err) {
          console.log(`There was an error updating ${err}`);
          return;
        }

        if (response.data.items) {
          console.log("Done");
        }

        return res.json({
          status: response?.status,
          statusText: response?.statusText,
        });
      }
    );
  };

  try {
    const xd = authorize(credentialsJson, makeAuthCall);
  } catch (error) {
    console.log("ERROR API YOUTUBE", error);
  }
}
