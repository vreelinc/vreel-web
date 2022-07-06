import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useSwiperSlide } from "swiper/react";

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
  const { isDuplicate } = useSwiperSlide();
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
        onSeek={() => {}}
        onReady={() => {
          console.log(`Video ${index} ready to play`);
        }}
        onPlay={() => {
          swiper.autoplay.stop();
          console.log(`Video ${index} is playing`);
          console.log(videoRef.current);
        }}
        onStart={() => {}}
        onPause={() => {
          if (!isActive) videoRef.current.seekTo(0);
        }}
        onEnded={() => {
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
// export default SliderVideo;
