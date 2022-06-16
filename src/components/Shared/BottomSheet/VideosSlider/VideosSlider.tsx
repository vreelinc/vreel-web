import React from "react";
import { openImages } from "src/redux/createSlice/bottomSheetSlice";
import CommonSliders from "../CommonVideoImageSlider/CommonSliders";

const dataLocal = [
  {
    uri: "/assets/videos/test-video-1.mp4",
    content_type: "video",
    alt: "slide-1",
  },
  {
    uri: "/assets/videos/test-video-2.mp4",
    content_type: "video",
    alt: "slide-2",
  },
  {
    uri: "/assets/videos/test-video-3.mp4",
    content_type: "video",
    alt: "slide-3",
  },
];

const VideosSlider = () => {
  return <CommonSliders data={dataLocal} actions={openImages} />;
};

export default VideosSlider;
