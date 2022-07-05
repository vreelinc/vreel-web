import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Styles from "./SliderVideo.module.scss";
const SliderVideo2: React.FC<{
  section: any;
  item: any;
  isActive?: boolean;
  index: number;
  mute: boolean;
  url: string;
  swiper: any;
}> = ({ section, isActive, index, url, mute, swiper }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    try {
      if (isActive) {
        console.log(isActive);
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (e) {}
  }, [isActive]);
  /*  return (
    <video
      ref={videoRef}
      className={Styles.video}
      autoPlay={true}
      muted={true}
      playsInline={false}
      onEnded={(e) => {
        swiper.slideNext();
        console.log("ended", isActive, index);
      }}
    >
      <source src={url} type={"video/mp4"}></source>
      Your browser does not support the video tag.
    </video>
  ); */
  return (
    <ReactPlayer
      ref={videoRef}
      playing={isActive}
      muted={mute}
      url={url}
      //   url="/assets/videos/test-video-3.mp4"
      playsinline={true}
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
