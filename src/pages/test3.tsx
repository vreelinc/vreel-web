import Events from "@sections/Events/Events";
import MainContainer from "@sections/MainContainer/MainContainer";
import VLinks from "@sections/VLinks/VLinks";
import { Loader } from "@shared/Loader/Loader";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useWindowDimensions from "@hooks/useWindowDimensions";

function test3() {
  const [num, setNum] = useState(0);
  return (
    <MainContainer>
      <div
        onScroll={(e: any) => {
          setNum(e.target.offsetHeight);
        }}
        style={{
          scrollSnapType: "y mandatory",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "100%",
              marginBottom: "10px",
              scrollSnapAlign: "start",
            }}
          >
            <Video index={index + 1} number={num * (index + 1)}></Video>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}

export default test3;

export const Video = ({ index, number }) => {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  const { height } = useWindowDimensions();

  return (
    <video
      ref={ref}
      onClick={() => {
        if (play) {
          ref.current.pause();
          setPlay(false);
        } else {
          ref.current.play();
          setPlay(true);
        }
      }}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
      }}
      autoPlay={play && height * index === number}
      loop
      muted
      playsInline
    >
      <source
        src={`https://media.istockphoto.com/videos/modern-factory-in-the-countryside-huge-industrial-complex-among-video-id1385449359`}
        type="video/mp4"
      ></source>
      Your browser does not support HTML5 video.
    </video>
  );
};
