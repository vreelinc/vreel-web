import { useEffect, useRef, useState } from "react";
import HeroSlide from "./HeroSlide";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade, Lazy } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Styles from "./HeroSlider.module.scss";
import clsx from "clsx";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_USER_NAME } from "../../../../services/graphql/query";
import { useRouter } from "next/router";
import useWindowDimensions from "src/hooks/useWindowDimensions";

const HeroSlider: React.FC<{
  view: "Mobile" | "Desktop";
  slides?: any;
  parentSwiper?: any;
}> = ({ view, slides, parentSwiper }) => {
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();
  const [autoPlay, setautoPlay] = useState(true);
  const { slide, username, section } = router.query;
  console.log({ slides });

  function setAutoPlay() {
    if (autoPlay) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setautoPlay(!autoPlay);
  }

  if (swiper && section) {
    swiper.autoplay.stop();
  }
  const slidesData = slides.filter((e) =>
    isMobile ? e.mobile.uri : e.desktop.uri
  );
  // console.log({ slides });

  const initialSlide = slide
    ? slidesData
        .sort((a, b) => a.slide_location - b.slide_location)
        ?.map((e) => e.id)
        .indexOf(slide)
    : 0;
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
          else {
            router.push(`/?slide=${slides?.map((e) => e.id)[s.realIndex]}`);
          }
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
        {slidesData.map((obj, index) => (
          <SwiperSlide key={index} className={Styles.vreelSlide}>
            <HeroSlide
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

export default HeroSlider;
