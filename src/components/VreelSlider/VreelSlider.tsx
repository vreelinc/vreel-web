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
import { useQuery } from "@apollo/client";
import { GET_USER_BY_USER_NAME } from "../graphql/query";
import { useRouter } from "next/router";

const dataLocal = [
  {
    uri: "/assets/videos/test-video-1.mp4",
    content_type: "video",
    alt: "slide-1",
  },
  {
    uri: "/assets/videos/test-video-2.mp4",
    content_type: "video",
    alt: "slide-2",
  },
  {
    uri: "/assets/videos/test-video-3.mp4",
    content_type: "video",
    alt: "slide-3",
  },
];

const VreelSlider: React.FC<{
  view: "Mobile" | "Desktop";
  data?: any;
  currentSlide: number;
  setCurrentSlide: Function;
}> = ({
  view,
  data,
  currentSlide: activeSlide,
  setCurrentSlide: setActiveSlide,
}) => {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();
  const [autoPlay, setautoPlay] = useState(true);
  function setAutoPlay() {
    if (autoPlay) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setautoPlay(!autoPlay);
  }
  const slides = data?.username.vreel.slides;
  const { slide, username } = router.query;
  console.log({ slides, slide, router });

  useEffect(() => {
    if (slide) {
      const index = slides?.map((e) => e.id).indexOf(slide);
      swiper?.slideTo(index);
      console.log(
        slides?.map((e) => e.id),
        slide,
        index
      );
    }
  }, [swiper]);

  return (
    <div className="vslider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination
        lazy={true}
        slidesPerView={1}
        onSlideChange={(s) => {
          if (username)
            router.push(
              `/hasan?slide=${slides?.map((e) => e.id)[s.realIndex]}`
            );
          setCurrentSlide(s.realIndex);
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
        {data
          ? slides.map((obj, index) => (
              <SwiperSlide key={index} className={Styles.vreelSlide}>
                <VreelSlide
                  slide={obj}
                  currentSlide={currentSlide}
                  swiper={swiper}
                  slideId={index}
                  autoPlay={autoPlay}
                  setAutoPlay={setAutoPlay}
                  activeSlide={activeSlide}
                  setActiveSlide={setActiveSlide}
                />
              </SwiperSlide>
            ))
          : dataLocal.map((obj, index) => (
              <SwiperSlide key={index} className={Styles.vreelSlide}>
                <VreelSlide
                  slide={obj}
                  currentSlide={currentSlide}
                  swiper={swiper}
                  slideId={index}
                  activeSlide={activeSlide}
                  setActiveSlide={setActiveSlide}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default VreelSlider;
