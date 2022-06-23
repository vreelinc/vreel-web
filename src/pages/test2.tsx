import { NextPage } from "next";
import { useSpringCarousel } from "react-spring-carousel";

const mockedItems = [
  { id: 1, color: "", title: "Content-1" },
  { id: 2, color: "", title: "Content-2" },
  { id: 3, color: "", title: "Content-3" },
];

const Test2: NextPage = () => {
  const {
    carouselFragment,
    slideToPrevItem,
    enterFullscreen,
    slideToNextItem,
  } = useSpringCarousel({
    items: [
      {
        id: "item-1",
        renderItem: (
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              width: "100vw",
            }}
          >
            <video
              // ref={videoEl}
              preload="metadata"
              autoPlay={true}
              muted={true}
              playsInline
              onEnded={(e) => {
                /* swiper.slideNext();
          console.log("ended", currentSlide, slideId); */
              }}
            >
              <source
                src="/assets/videos/test-video-1.mp4"
                type={"video/mp4"}
              ></source>
              Your browser does not support the video tag.
            </video>
          </div>
        ),
      },
      {
        id: "item-2",
        renderItem: (
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              width: "100vw",
            }}
          >
            <video
              // ref={videoEl}
              preload="metadata"
              autoPlay={true}
              muted={true}
              playsInline
              onEnded={(e) => {
                /* swiper.slideNext();
          console.log("ended", currentSlide, slideId); */
              }}
            >
              <source
                src="https://res.cloudinary.com/klwebco/video/upload/v1655858114/samples/pexels-rodnae-productions-7895613_itn7mi.mp4"
                type={"video/mp4"}
              ></source>
              Your browser does not support the video tag.
            </video>
          </div>
        ),
      },
    ],
  });
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {carouselFragment}
    </div>
  );
};

export default Test2;
