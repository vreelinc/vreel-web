import React from "react";
import CommonSliders from "../CommonVideoImageSlider/CommonSliders";

const imageData = [
  {
    uri: "/assets/images/Events1.svg",
    content_type: "images",
    alt: "slide-1",
  },
  {
    uri: "/assets/images/Events2.svg",
    content_type: "images",
    alt: "slide-2",
  },
  {
    uri: "/assets/images/regLogBg.png",
    content_type: "images",
    alt: "slide-3",
  },
];

const ImagesSlider = ({ parentSwiper }) => {
  return (
    <CommonSliders data={imageData} parentSwiper={parentSwiper}>
      <span></span>
    </CommonSliders>
  );
};

export default ImagesSlider;
