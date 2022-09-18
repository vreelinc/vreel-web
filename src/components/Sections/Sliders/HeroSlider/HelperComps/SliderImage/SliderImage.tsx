import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { duration } from "src/conf/slide";
import Styles from "../../HeroSlide/HeroSlide.module.scss";

const SliderImage: React.FC<{
  url: string;
  background_audio_uri: string;
  mute: boolean;
  swiper: any;
  isActive: boolean;
  index: number;
  autoPlay: boolean
}> = ({ url, background_audio_uri, mute, swiper, isActive, index, autoPlay }) => {
  useEffect(() => {
    let timeout;
    if (isActive && autoPlay) {
      timeout = setTimeout(() => swiper?.slideNext(), duration)
    } else {
      clearTimeout(timeout);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [isActive])
  return (
    <>
      <img
        className={Styles.image}
        src={url}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </>
  );
};

export default SliderImage;
