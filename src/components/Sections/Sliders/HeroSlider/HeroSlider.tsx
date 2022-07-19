import React, { CSSProperties, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { format } from "url";
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
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import HeroSlide from "./HeroSlide/HeroSlide";
import { log } from "console";

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
  const [videoPlay, setVideoPlay] = useState<boolean>(true);
  const [mute, setMute] = useState<boolean>(true);
  const { pathname, query } = router;
  const { slide, username, section, employee, mode } = router.query;
  const [sliderPlay, setsliderPlay] = useState<boolean>(
    mode == "manual" ? false : true
  );
  console.log({ mode });

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
    if (username && employee)
      router.push(
        `/${username}/e/${employee}?slide=${slides?.map((e) => e.id)[0]}${
          mode ? `&mode=${mode}` : ""
        }`
      );
    else if (username)
      router.push(
        `/${username}?slide=${slides?.map((e) => e.id)[0]}${
          mode ? `&mode=${mode}` : ""
        }`
      );
    else {
      router.push(
        `/?slide=${slides?.map((e) => e.id)[0]}${mode ? `&mode=${mode}` : ""}`
      );
    }
  }, []);

  console.log("1. HeroSlider rendered.");

  // const handleSlideChange = useMemo((swiper) => {
  //   setCurrentSlide(swiper.realIndex);
  // }, []);

  // const handleSlideChange = useMemo((swiper) => {
  //   setCurrentSlide(swiper.realIndex);
  // }, []);
  console.log({ sliderPlay });

  return (
    <div
      className="vslider"
      onDoubleClick={() => {
        if (sliderPlay && mode == "manual") {
          delete query["mode"];
          router.push({
            query: { ...query },
          });
          setsliderPlay(true);
        } else if (sliderPlay) {
          router.push({
            query: { ...query, mode: "manual" },
          });
          setsliderPlay(false);
        } else {
          delete query["mode"];
          router.push({
            query: { ...query },
          });
          setsliderPlay(true);
        }
        toast.success(`Presentation ${sliderPlay ? "On" : "Off"}`);

        console.log("double click....");
      }}
      style={
        {
          width: "100%",
          height: "100%",
          "--bottom": `${
            parentSwiper?.activeIndex !==
            parseInt(parentSwiper?.slides?.length) - 1
              ? 25
              : 10
          }px`,
        } as CSSProperties
      }
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        // lazy={true}
        // loop={true}
        // effect="fade"
        rewind={true}
        onLoad={() => {}}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          console.log("Slide changed.....", username);
          console.log({ s });

          if (username && employee)
            router.push(
              `/${username}/e/${employee}?slide=${
                slides?.map((e) => e.id)[s.realIndex]
              }`
            );
          else if (username) {
            router.push(
              `/${username}?slide=${slides?.map((e) => e.id)[s.realIndex]}`
            );
            console.log({ username });
          } else {
            router.push(
              `/?slide=${slides?.map((e) => e.id)[s.realIndex]}${
                mode ? `&mode=${mode}` : ""
              }`
            );
          }

          if (s.realIndex == 0 || currentSlide == 0) {
            if (s.realIndex > currentSlide) {
              if (!s.autoplay.running) s?.autoplay.start();
            } else {
              if (s.autoplay.running) s.autoplay.stop();
              setsliderPlay(false);
            }
          } else if (s.realIndex < currentSlide) {
            if (s.autoplay.running) s.autoplay.stop();
            setsliderPlay(false);
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
          // console.log("On swiper----------");
          // swiper.loopDestroy();
          // swiper.loopCreate();
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
                // console.log({ isDuplicate, index });
                // if (isDuplicate) return <div></div>;
                return (
                  <HeroSlide
                    slide={obj}
                    isActive={isActive}
                    swiper={swiper}
                    parentSwiper={parentSwiper}
                    slideId={index}
                    sliderPlay={sliderPlay}
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
