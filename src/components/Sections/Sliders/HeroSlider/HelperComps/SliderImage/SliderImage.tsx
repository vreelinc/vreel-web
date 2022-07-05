import React from "react";
import ReactPlayer from "react-player";
import Styles from "../../HeroSlide/HeroSlide.module.scss";

const SliderImage: React.FC<{
  url: string;
  background_audio_uri: string;
  mute: boolean;
  swiper: any;
  isActive: boolean;
  index: number;
}> = ({ url, background_audio_uri, mute, swiper, isActive, index }) => {
  return (
    <>
      <img
        className={Styles.image}
        src={url}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {background_audio_uri && !mute && isActive && (
        <ReactPlayer
          playing={true}
          muted={mute}
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
          //   url="/assets/videos/test-video-3.mp4"
          playsinline={true}
          // stopOnUnmount={true}
          onPlay={() => {
            swiper.autoplay.stop();
            console.log("autoplay stopped in......", index);
          }}
          onPause={() => {
            // swiper.autoplay.start();
            console.log("autoplay started in......", index);
          }}
          onEnded={() => {
            swiper.slideNext();
          }}
          config={{
            file: {
              attributes: {
                autoPlay: true,
                playsInline: true,
                muted: mute,
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
      )}
    </>
  );
};

export default SliderImage;
