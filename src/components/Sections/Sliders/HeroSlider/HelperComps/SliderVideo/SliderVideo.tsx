import { getDuration } from "@redux/createSlice/vreelSlice";
import { useAppDispatch } from "@redux/store/store";
import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const SliderVideo: React.FC<{
  section: any;
  item: any;
  currentSlide: number;
  index: number;
  mute: boolean;
  url: string;
  swiper: any;
  playing: boolean;
}> = ({ section, currentSlide, index, url, mute, swiper, playing }) => {
  const videoRef = useRef(null);
  // console.log("slider video rendered...........");

  return (
    <>
      <ReactPlayer
        ref={videoRef}
        playing={currentSlide == index && playing}
        muted={mute}
        url={url}
        //   url="/assets/videos/test-video-3.mp4" // currentSlide == index
        playsinline={true}
        // stopOnUnmount={true}
        pip={false}
        onSeek={() => console.log(`${section} video ${index} seek`)}
        onReady={() => console.log(`${section} video ${index} ready to play`)}
        onPlay={() => {
          swiper.autoplay.stop();
          console.log("autoplay stopped in......", currentSlide);
          console.log(`${section} video ${index} playing`);
        }}
        onStart={() => {}}
        onPause={() => {
          if (currentSlide != index) videoRef.current.seekTo(0);
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
    </>
  );
};

export default SliderVideo;
