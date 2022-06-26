import Events from "@sections/Events/Events";
import VLinks from "@sections/VLinks/VLinks";
import { Loader } from "@shared/Loader/Loader";
import { useState } from "react";
import { Audio } from "react-loader-spinner";
export default function test() {
  const [loading, setloading] = useState(true);
  // return (
  //   <div style={{ width: "100%", height: "100%", background: "red" }}></div>
  // );
  // return <Loader />;
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: "10",
      }}
    >
      <video
        // ref={videoEl}
        preload="auto"
        autoPlay
        muted={true}
        playsInline
        onLoadedData={() => {
          setloading(false);
        }}
        onEnded={(e) => {
          /* swiper.slideNext();
                console.log("ended", currentSlide, slideId); */
        }}
      >
        <source
          src={
            "https://stephon-transcoded-video.s3.amazonaws.com/hls/bentoAvHev/master.m3u8"
          }
          type={"video/mp4"}
        ></source>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
