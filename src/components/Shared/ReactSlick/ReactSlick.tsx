import MainContainer from "@sections/MainContainer/MainContainer";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReactSlick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    accessibility: true,
    adaptiveHeight: true,
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "green",
        margin: "0 auto",
      }}
    >
      <Slider
        {...settings}
        style={{
          width: "95%",
          height: "95%",
          backgroundColor: "olive",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <div>
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReactSlick;
