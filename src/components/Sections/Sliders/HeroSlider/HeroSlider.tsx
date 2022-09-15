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
import { duration } from "src/conf/slide";

const HeroSlider: React.FC<{
  view: "Mobile" | "Desktop";
  slides?: any;
  sectionMap: any,
  parentSwiper?: any;
}> = ({ view, slides, parentSwiper, sectionMap }) => {
  const shareOpen = useSelector(
    (state: RootState) => state.expandMenu.initShareState
  );
  const QROpen = useSelector(
    (state: RootState) => state.expandMenu.initQRState
  );
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
  const [previousSlideIndex, setPreviousSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState<any>({
    delay: duration,
    disableOnInteraction: false,
  })
  const [sliderPlay, setsliderPlay] = useState<boolean>(
    mode == "manual" ? false : true
  );
  console.log({ slides });

  const slidesData = slides.filter((e) =>
    isMobile ? e.mobile.uri : e.desktop.uri
  );
  // console.log({ slides });
  useEffect(() => {
    console.log("slides!!", slides)
  }, [])
  slidesData.sort((a, b) => a.slide_location - b.slide_location);

  const initialSlide = slide ? slidesData?.map((e) => e.id).indexOf(slide) : 0;

  const item = isMobile
    ? slidesData[currentSlide]?.mobile
    : slidesData[currentSlide]?.desktop;

  /*   useEffect(() => {
    const isCurrentImage =
      slidesData[currentSlide][
        isMobile ? "mobile" : "desktop"
      ].content_type.split("/")[0] == "image";
    if (isCurrentImage) {
    }
  }, []); */

  useEffect(() => {
    if (QROpen || shareOpen) {
      swiper?.autoplay.stop();
    } else {
      const isCurrentImage =
        slidesData[currentSlide][
          isMobile ? "mobile" : "desktop"
        ].content_type.split("/")[0] == "image";
      if (isCurrentImage) {
        swiper?.autoplay.start();
      }
    }
  }, [QROpen, shareOpen]);
  function navigateToSlide(id) {
    const slideIndex = slidesData?.findIndex(slide => slide.id === id);
    console.log("[provided index", slideIndex)
    if (swiper) {
      swiper.slideTo(slideIndex);
    }

  }
  function navigateToSection(id: string) {
    const sectionIndex = sectionMap[id];
    console.log("swiper id request", id)
    if (swiper) {
      parentSwiper.slideTo(sectionIndex)
    }
  }
  const handleSlideUrl = (s) => {
    if (s.activeIndex === previousSlideIndex && s.previousIndex > s.activeIndex) {
      setAutoPlay(false);
      swiper.autoplay.stop();

    } else {
      setAutoPlay({
        delay: duration,
        disableOnInteraction: false,
      });
      swiper?.autoplay?.start();

    }
    setPreviousSlideIndex(s.previousIndex);


    if (username && employee) {
      router.push(
        `/${username}/e/${employee}${s.realIndex
          ? `?slide=${slidesData?.map((e) => e.id)[s.realIndex]}`
          : ""
        }${!sliderPlay ? "?&mode=manual" : ""}`
      );
    } else if (username) {
      router.push(
        `/${username}${s.realIndex
          ? `?slide=${slidesData?.map((e) => e.id)[s.realIndex]}`
          : ""
        }${!sliderPlay ? "?&mode=manual" : ""}`
      );
    } else {
      router.push(
        `/${s.realIndex
          ? `?slide=${slidesData?.map((e) => e.id)[s.realIndex]}`
          : ""
        }${!sliderPlay ? "?&mode=manual" : ""}`
      );
    }
  };

  return (
    <div
      className="vslider"
      onDoubleClick={() => {
        if (sliderPlay) {
          router.push({
            query: { ...query, mode: "manual" },
          });
          setsliderPlay(false);
          swiper.autoplay.stop();
        } else {
          delete query["mode"];
          router.push({
            query: { ...query },
          });
          setsliderPlay(true);
          swiper.autoplay.start();
        }
        toast.success(`Presentation ${sliderPlay ? "On" : "Off"}`);
      }}
      style={
        {
          width: "100%",
          height: "100%",
          "--bottom": `${parentSwiper?.activeIndex !==
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
        onLoad={() => { }}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          // console.log({ s });
          handleSlideUrl(s);

          if (
            (s.isBeginning && s.activeIndex == s.previousIndex - 1) ||
            s.activeIndex == s.previousIndex - 1
          ) {
            s.autoplay.stop();
          } else if (s.isBeginning && s.activeIndex != s.previousIndex - 1) {
            s.autoplay.start();
          } else if (s.isEnd && s.activeIndex == s.previousIndex + 1) {
            s.autoplay.start();
          } else if (s.isEnd && s.activeIndex != s.previousIndex + 1) {
            s.autoplay.stop();
          }
          console.log({
            running: s.autoplay.running,
            active: s.activeIndex,
            prev: s.previousIndex,
            b: s.isBeginning,
            e: s.isEnd,
          });
          // setMute(true);
          const isCurrentImage =
            slidesData[s.realIndex][
              isMobile ? "mobile" : "desktop"
            ].content_type.split("/")[0] == "image";

          if (sliderPlay && isCurrentImage) {
            swiper?.autoplay?.start();
          }
          // console.log("Slider Changed----------");
          setCurrentSlide(s.realIndex);
        }}
        speed={1000}
        autoplay={autoPlay}
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
                    navigateToSlide={navigateToSlide}
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
                    navigateToSection={navigateToSection}
                    autoPlay={autoPlay}
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
