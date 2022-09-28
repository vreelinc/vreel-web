import { RootState } from "@redux/store/store";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
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
  setProgress?: Function;
  sliderPlay?: boolean;
  autoPlay: any;
  muteAudio: any;
  playAudio: any;
  setAutoPlay: any;
}> = ({
  section,
  isActive,
  index,
  url,
  mute,
  swiper,
  playing,
  setProgress,
  setAutoPlay,
  sliderPlay,
  autoPlay,
  playAudio,
  muteAudio
}) => {
    const videoRef = useRef(null);
    const { isDuplicate } = useSwiperSlide();
    const shareOpen = useSelector(
      (state: RootState) => state.expandMenu.initShareState
    );
    const QROpen = useSelector(
      (state: RootState) => state.expandMenu.initQRState
    );

    useEffect(() => {
      swiper.autoplay.stop();
    }, [])
    // if (videoRef.current) return <div></div>;
    // console.log({ section });
    // console.log({ isActive, playing, sliderPlay });
    // return (
    //   <ReactPlayer
    //     ref={videoRef}
    //     playing={true}
    //     loop={true}
    //     muted={mute}
    //     autoPlay
    //     url={url}
    //     config={{
    //       file: {
    //         attributes: {
    //           style: {
    //             position: "absolute",
    //             top: 0,
    //             left: 0,
    //             zIndex: -2,
    //             height: "100%",
    //             width: "100%",
    //             objectFit: "cover",
    //           },
    //         },
    //       },
    //     }}
    //   />
    // );J
    return (
      <>
        <ReactPlayer
          ref={videoRef}
          // playing={true}
          playing={isActive && playing}
          // volume={mute ? 0 : 1}
          loop={!autoPlay ? true : (!sliderPlay)}
          // loop={false}
          muted={mute}
          autoPlay
          url={url}
          //   url="/assets/videos/test-video-3.mp4" // isActive == index
          playsinline={true}
          // stopOnUnmount={true}
          pip={false}
          onSeek={() => { }}
          onReady={() => { }}
          onPlay={() => {
            swiper.autoplay.stop();
            if (mute) {
              // muteAudio();
            }
            console.log(`Video ${index} is playing in ${section}`);
          }}
          onStart={() => { }}
          onProgress={({ played }) => {
            // console.log(played);
            setProgress && setProgress(played);
          }}
          onPause={() => {
            if (!isActive) videoRef.current.seekTo(0);
          }}
          onEnded={() => {
            console.log(`video ended in ${section}`);
            playAudio();
            if (sliderPlay && !(QROpen || shareOpen)) {
              if (autoPlay) {
                swiper.slideNext();
                swiper.autoplay.start();
              }
            } else {
            }
            if (isActive) videoRef.current.seekTo(0);
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
