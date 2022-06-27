import React, { useRef } from "react";
import ReactPlayer from "react-player";

const SliderVideo: React.FC<{
  section: any;
  item: any;
  currentSlide: number;
  index: number;
  mute: boolean;
  url: string;
  swiper: any;
  autoPlay: boolean;
  playing: boolean;
}> = ({
  section,
  currentSlide,
  index,
  url,
  mute,
  swiper,
  autoPlay,
  playing,
}) => {
  const videoRef = useRef(null);
  console.log({ playing });

  return (
    <ReactPlayer
      ref={videoRef}
      playing={currentSlide == index && playing}
      muted={mute}
      url={url}
      //   url="/assets/videos/test-video-3.mp4" // currentSlide == index
      playsinline={currentSlide == index}
      // stopOnUnmount={true}
      onSeek={() => console.log(`${section} video ${index} seek`)}
      onReady={() => console.log(`${section} video ${index} ready to play`)}
      onPlay={() => console.log(`${section} video ${index} playing`)}
      onStart={() => {
        /*   console.log(videoRef.current.getCurrentTime());
        videoRef.current.seekTo(0);
        console.log(videoRef.current.getCurrentTime());
        console.log(`${section} video ${index} started`); */
      }}
      onPause={() => {
        /*   console.log(videoRef.current.getCurrentTime());
        videoRef.current.seekTo(0);
        console.log(videoRef.current.getCurrentTime());
        console.log(videoRef.current); */
      }}
      onEnded={() => {
        console.log(`${section} video ${index} Ended`);
        swiper.slideNext();
      }}
      config={{
        file: {
          attributes: {
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
  );
};

export default SliderVideo;
