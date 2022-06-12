import { useEffect, useRef, useState } from "react";
import VreelSlide from "./VreelSlide";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade, Lazy } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Styles from "./VreelSlider.module.scss";
import clsx from "clsx";

const data = [
  { src: "/assets/videos/test-video-1.mp4", alt: "slide-1" },
  { src: "/assets/videos/test-video-2.mp4", alt: "slide-2" },
  { src: "/assets/videos/test-video-3.mp4", alt: "slide-3" },
];

const VreelSlider: React.FC<{
  view: "Mobile" | "Desktop";
  isUserName: string;
}> = ({ view, isUserName }) => {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop
      navigation
      pagination
      slidesPerView={1}
      onSlideChange={(slide) => {
        setCurrentSlide(slide.realIndex);
      }}
      speed={1500}
      autoplay={{
        delay: 10000,
      }}
      onSwiper={(swiper) => {
        setSwiper(swiper);
      }}
      // effect='fade'
      className={clsx(
        Styles.vreelSlider,
        view === "Desktop"
          ? Styles.vreelSlider_desktop
          : Styles.vreelSlider_mobile
      )}
    >
      {data.map((obj, index) => (
        <SwiperSlide key={index} className={Styles.vreelSlide}>
          <VreelSlide
            slide={obj}
            currentSlide={currentSlide}
            swiper={swiper}
            slideId={index}
            isUserName={isUserName}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VreelSlider;
