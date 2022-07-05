import { getDuration } from "@redux/createSlice/vreelSlice";
import { useAppDispatch } from "@redux/store/store";
import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const SliderVideo: React.FC<{
  section: any;
  item: any;
  isActive: boolean;
  index: number;
  mute: boolean;
  url: string;
  swiper?: any;
  playing: boolean;
}> = ({ section, isActive, index, url, mute, swiper, playing }) => {
  const videoRef = useRef(null);
  // console.log("slider video rendered...........");
  console.log(`4. Slider video rendered....because ${index} is ${isActive}`, {
    section,
  });

  // if (videoRef.current) return <div></div>;
  return (
    <>
      <ReactPlayer
        ref={videoRef}
        playing={isActive && playing}
        // volume={mute ? 0 : 1}
        muted={mute}
        autoPlay
        url={url}
        //   url="/assets/videos/test-video-3.mp4" // isActive == index
        playsinline={true}
        // stopOnUnmount={true}
        pip={false}
        onReady={() => console.log(`${section} video ${index} ready to play`)}
        onPlay={() => {
          swiper?.autoplay.stop();
          // console.log(videoRef.current);
          console.log(`${section} video ${index} playing`);
        }}
        onStart={() => {}}
        onPause={() => {
          if (!isActive) videoRef.current.seekTo(0);
        }}
        onEnded={() => {
          console.log(`${section} video ${index} Ended`);
          swiper?.slideNext();
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

export default React.memo(SliderVideo);
// export default SliderVideo;
