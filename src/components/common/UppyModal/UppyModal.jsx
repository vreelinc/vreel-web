import React, { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");
const { DashboardModal } = require("@uppy/react");
const GoogleDrive = require("@uppy/google-drive");
const Dropbox = require("@uppy/dropbox");
const Instagram = require("@uppy/instagram");
const Url = require("@uppy/url");
const Webcam = require("@uppy/webcam");

const UppyModal = ({ open, setOpen }) => {
  const [cookies] = useCookies(["userAuthToken"]);

  const uppy = new Uppy({ id: "uppy", autoProceed: false, debug: true })
    .use(Tus, {
      endpoint: process.env.NEXT_PUBLIC_MEDIA_BASE_URL,
      headers: {
        token: cookies["userAuthToken"],
        "Access-Control-Allow-Origin": "http://localhost:7070",
        "Access-Control-Allow-Headers": "*",
        // "Access-Control-Request-Headers": "*"
      },
      removeFingerprintOnSuccess: true,
    })
    .use(GoogleDrive, { companionUrl: "https://companion.uppy.io" })
    .use(Dropbox, { companionUrl: "https://companion.uppy.io" })
    .use(Instagram, { companionUrl: "https://companion.uppy.io" })
    .use(Url, { companionUrl: "https://companion.uppy.io" })
    .use(Webcam, {
      mirror: true,
      facingMode: "user",
      showRecordingLength: true,
    });

  uppy.on("complete", (result) => {
    // refetch();
    result.successful.map((res) => {
      toast.success(`Upload ${res.type} successfully`);
    });
  });
  return (
    <div>
      <DashboardModal
        uppy={uppy}
        open={open}
        plugins={[
          "GoogleDrive",
          "Dropbox",
          "Instagram",
          "ScreenCapture",
          "Url",
          "Webcam",
        ]}
        // target={document.body}
        onRequestClose={() => setOpen(false)}
      />
    </div>
  );
};

export default UppyModal;
