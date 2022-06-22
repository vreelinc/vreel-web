import Events from "@sections/Events/Events";
import VLinks from "@sections/VLinks/VLinks";
import { Loader } from "@shared/Loader/Loader";
import { Audio } from "react-loader-spinner";
export default function test() {
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
        preload="metadata"
        autoPlay
        muted={true}
        playsInline
        onEnded={(e) => {
          /* swiper.slideNext();
                console.log("ended", currentSlide, slideId); */
        }}
      >
        <source
          src={
            "https://res.cloudinary.com/klwebco/video/upload/v1655863954/samples/aiexplainer_optimized_o24q3q.mp4"
          }
          type={"video/mp4"}
        ></source>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
