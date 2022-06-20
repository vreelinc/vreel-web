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
import useWindowDimensions from "src/hooks/useWindowDimensions";

const VreelSlider: React.FC<{
  view: "Mobile" | "Desktop";
  vreel?: any;
  parentSwiper?: any;
}> = ({ view, vreel, parentSwiper }) => {
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
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
  console.log({ slides: vreel });

  const slides = vreel.slides.filter((e) =>
    isMobile ? e.mobile.uri : e.desktop.uri
  );
  const { slide, username } = router.query;
  // console.log({ slides });

  const initialSlide = slide
    ? 0
    : slides
        .sort((a, b) => a.slide_location - b.slide_location)
        ?.map((e) => e.id)
        .indexOf(slide);
  // console.log({ slides });

  return (
    <div className="vslider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination
        onLoad={() => {}}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          if (username)
            router.push(
              `/${username}?slide=${slides?.map((e) => e.id)[s.realIndex]}`
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
        {slides.map((obj, index) => (
          <SwiperSlide key={index} className={Styles.vreelSlide}>
            <VreelSlide
              slide={obj}
              currentSlide={currentSlide}
              swiper={swiper}
              parentSwiper={parentSwiper}
              slideId={index}
              autoPlay={autoPlay}
              setAutoPlay={setAutoPlay}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VreelSlider;
