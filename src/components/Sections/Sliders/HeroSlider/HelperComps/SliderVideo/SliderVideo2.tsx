import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Styles from "./SliderVideo.module.scss";
const SliderVideo2: React.FC<{
  section: any;
  item: any;
  currentSlide: number;
  index: number;
  mute: boolean;
  url: string;
  swiper: any;
}> = ({ section, currentSlide, index, url, mute, swiper }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    try {
      if (currentSlide === index) {
        console.log(currentSlide === index);

        setTimeout(() => {
          videoRef.current.play();
        }, 5000);
      } else {
        videoRef.current.pause();
      }
    } catch (e) {}
  }, [currentSlide]);
  return (
    <video
      ref={videoRef}
      className={Styles.video}
      autoPlay={true}
      muted={true}
      playsInline={false}
      onEnded={(e) => {
        swiper.slideNext();
        console.log("ended", currentSlide, index);
      }}
    >
      <source src={url} type={"video/mp4"}></source>
      Your browser does not support the video tag.
    </video>
  );
  return (
    <ReactPlayer
      ref={videoRef}
      playing={currentSlide == index}
      muted={mute}
      url={url}
      //   url="/assets/videos/test-video-3.mp4"
      playsinline={currentSlide == index}
      // stopOnUnmount={true}
      onSeek={() => console.log(`${section} video ${index} seek`)}
      onReady={() => console.log(`${section} video ${index} ready to play`)}
      onPlay={() => console.log(`${section} video ${index} playing`)}
      onStart={() => {
        console.log(videoRef.current.getCurrentTime());
        videoRef.current.seekTo(0);
        console.log(videoRef.current.getCurrentTime());
        console.log(`${section} video ${index} started`);
      }}
      onPause={() => {
        console.log(videoRef.current.getCurrentTime());
        videoRef.current.seekTo(0);
        console.log(videoRef.current.getCurrentTime());
        console.log(videoRef.current);
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

export default SliderVideo2;
