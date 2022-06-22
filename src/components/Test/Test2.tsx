import { NextPage } from "next";
import ReactPlayer from "react-player";
import { useSpringCarousel } from "react-spring-carousel";

const mockedItems = [
  { id: 1, color: "", title: "Content-1" },
  { id: 2, color: "", title: "Content-2" },
  { id: 3, color: "", title: "Content-3" },
];

const Test2: React.FC = () => {
  const {
    carouselFragment,
    slideToPrevItem,
    enterFullscreen,
    slideToNextItem,
  } = useSpringCarousel({
    items: [
      "https://res.cloudinary.com/klwebco/video/upload/v1655863954/samples/aiexplainer_optimized_o24q3q.mp4",
      "https://res.cloudinary.com/klwebco/video/upload/v1655858114/samples/pexels-rodnae-productions-7895613_itn7mi.mp4",
      "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
      "https://res.cloudinary.com/klwebco/video/upload/v1645686811/samples/sea-turtle.mp4",
    ].map((e) => {
      return {
        id: "item-1",
        renderItem: (
          <ReactPlayer
            playing={true}
            muted={true}
            url={e}
            //   url="/assets/videos/test-video-3.mp4"
            playsinline={false}
            config={{
              file: {
                attributes: {
                  autoPlay: false,
                  playsInline: false,
                  muted: true,
                  type: "video",
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -2,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        ),
      };
    }),
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
