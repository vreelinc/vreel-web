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
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import clsx from "clsx";

const fakeData = [
  { type: "video", link: "/assets/videos/test-video-1.mp4", alt: "slide-1" },
  { type: "video", link: "/assets/videos/test-video-2.mp4", alt: "slide-2" },
  { type: "video", link: "/assets/videos/test-video-3.mp4", alt: "slide-3" },
  // { src: '/assets/videos/test-video-4.mp4', alt: 'slide-4' },
  // { src: '/assets/videos/test-video-5.mp4', alt: 'slide-5' },
];

const VreelSlider: React.FC<{
  view: "Desktop" | "Mobile";
}> = ({ view }) => {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);

  const { mediaMobileSlidePreviewLink, mediaSlidePreviewLink } = useSelector(
    (state: RootState) => state.mobileMediaSelector
  );

  const previewData =
    view === "Desktop" ? mediaSlidePreviewLink : mediaMobileSlidePreviewLink;
  const slideData = previewData.length ? previewData : fakeData;

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
          ? Styles.vreelSlider__Desktop
          : Styles.vreelSlider__Mobile
      )}
    >
      {slideData.map((obj, index) => (
        <SwiperSlide key={index} className={Styles.vreelSlide}>
          <VreelSlide
            slide={obj}
            currentSlide={currentSlide}
            swiper={swiper}
            slideId={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VreelSlider;
