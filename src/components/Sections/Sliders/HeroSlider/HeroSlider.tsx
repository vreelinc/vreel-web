import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-flip";

import Styles from "./HeroSlider.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import useWindowDimensions from "src/hooks/useWindowDimensions";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import HeroSlide from "./HeroSlide/HeroSlide";

const HeroSlider: React.FC<{
  view: "Mobile" | "Desktop";
  slides?: any;
  parentSwiper?: any;
}> = ({ view, slides, parentSwiper }) => {
  const state = useSelector((state: RootState) => state.expandMenu);
  const { width } = useWindowDimensions();
  const isMobile = width < 500;
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [sliderPlay, setsliderPlay] = useState<boolean>(true);
  const [videoPlay, setVideoPlay] = useState<boolean>(true);
  const [mute, setMute] = useState<boolean>(true);
  const { slide, username, section, employee } = router.query;

  const slidesData = slides.filter((e) =>
    isMobile ? e.mobile.uri : e.desktop.uri
  );
  // console.log({ slides });
  slidesData.sort((a, b) => a.slide_location - b.slide_location);
  const initialSlide = slide ? slidesData?.map((e) => e.id).indexOf(slide) : 0;
  // console.log({ slidesData: slidesData.map((e) => e.id), slide, initialSlide });

  const item = isMobile
    ? slidesData[currentSlide]?.mobile
    : slidesData[currentSlide]?.desktop;

  useEffect(() => {
    if (slide) {
      if (username && employee)
        router.push(
          `/${username}/e/${employee}?slide=${slides?.map((e) => e.id)[0]}`
        );
      else if (username)
        router.push(`/${username}?slide=${slides?.map((e) => e.id)[0]}`);
      else {
        router.push(`/?slide=${slides?.map((e) => e.id)[0]}`);
      }
    }
  }, []);

  console.log("1. HeroSlider rendered.");

  // const handleSlideChange = useMemo((swiper) => {
  //   setCurrentSlide(swiper.realIndex);
  // }, []);

  // const handleSlideChange = useMemo((swiper) => {
  //   setCurrentSlide(swiper.realIndex);
  // }, []);

  return (
    <div className="vslider" style={{ height: "100%", width: "100%" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        lazy={true}
        // loop={true}
        // effect="flip"
        rewind={true}
        onLoad={() => {}}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          console.log("Slide changed.....");
          console.log({ s });

          if (username && employee)
            router.push(
              `/${username}/e/${employee}?slide=${
                slides?.map((e) => e.id)[s.realIndex]
              }`
            );
          else if (username)
            router.push(
              `/${username}?slide=${slides?.map((e) => e.id)[s.realIndex]}`
            );
          else {
            router.push(`/?slide=${slides?.map((e) => e.id)[s.realIndex]}`);
          }
          if (s.realIndex == 0 || currentSlide == 0) {
            if (s.realIndex > currentSlide) {
              if (!s.autoplay.running) s?.autoplay.start();
            } else {
              if (s.autoplay.running) s.autoplay.stop();
            }
          } else if (s.realIndex < currentSlide) {
            if (s.autoplay.running) s.autoplay.stop();
          } else {
            if (!s.autoplay.running) s?.autoplay.start();
            setsliderPlay(true);
          }
          // setMute(true);

          console.log("Slider Changed----------");
          setCurrentSlide(s.realIndex);
        }}
        speed={1000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          console.log("On swiper----------");
          setSwiper(swiper);
        }}
        // effect='fade'
        className={clsx(Styles.vreelSlider)}
      >
        {slidesData.map((obj, index) => {
          const isActive = currentSlide == index;
          // return <TestCom isActive={isActive} index={index} />;
          return (
            <SwiperSlide key={index} className={Styles.vreelSlide}>
              {({ isDuplicate }) => {
                console.log({ isDuplicate, index });
                if (isDuplicate) return <div></div>;
                return (
                  <HeroSlide
                    slide={obj}
                    isActive={isActive}
                    swiper={swiper}
                    parentSwiper={parentSwiper}
                    slideId={index}
                    index={index}
                    setMute={setMute}
                    mute={mute}
                    playing={videoPlay}
                    setPlaying={setVideoPlay}
                  />
                );
              }}

              {/* <TestCom isActive={isActive} index={index} /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default React.memo(HeroSlider);
