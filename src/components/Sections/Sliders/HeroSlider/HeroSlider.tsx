import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
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
import { v4 as uuid } from "uuid";
import useFonts from "@hooks/useFonts";

const HeroSlider: React.FC<{
  view?: "Mobile" | "Desktop";
  slides?: any;
  sectionMap: any;
  parentSwiper?: any;
  isSection: boolean;
  headerText?: string;
  muteAudio: () => void;
  playAudio: () => void;
  active: boolean;
  idx: number;
  default_logo?: string;
  displayOptions: any;
  setMute: (b: boolean) => void;
  mute: boolean;
  slidesState: object;
  setSlidesState: any;
  updateSlide: any;
}> = ({
  updateSlide,
  slidesState,
  setSlidesState,
  idx,
  view,
  default_logo,
  slides,
  parentSwiper,
  sectionMap,
  isSection,
  headerText,
  muteAudio,
  playAudio,
  active,
  displayOptions,
  setMute,
  mute,
}) => {
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
    const path = router.asPath;
    const [swiper, setSwiper] = useState(null);
    const [videoPlay, setVideoPlay] = useState<boolean>(true);
    const { pathname, query } = router;
    const { slide, username, section, employee, mode } = router.query;
    const [previousSlideIndex, setPreviousSlideIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState<boolean>(true);
    const heroSlide = useSwiperSlide();
    const [displaySlides, setDisplaySlides] = useState([]);

    const didMount = useRef(false);
    useEffect(() => {

      if (slide) {
        navigateToSlide(slide);
      }

    }, [swiper])
    useEffect(() => {
      if (!active) {
        setVideoPlay(false);
      } else {
        setVideoPlay(true);
      }
    }, [active]);

    useEffect(() => {
      if (!heroSlide.isActive) {
        setVideoPlay(false);
      }
    }, [heroSlide]);
    useEffect(() => { }, [heroSlide]);
    // useEffect(() => {
    //   setVideoPlay(true)
    // }, [])

    const { fonts, setFonts } = useFonts([]);
    const [sliderPlay, setsliderPlay] = useState<boolean>(
      mode == "manual" ? false : true
    );

    useEffect(() => {
      if (slides.length === 1) {
        setAutoPlay(false);
        setsliderPlay(false);
      }
    }, []);

    useEffect(() => {
      let displaySlides = slides?.filter((slide, idx) => {
        console.log("filter slide =>", slide);
        if (isMobile) {
          return slide?.mobile.uri !== "/waterfall.mp4";
        }
        if (!isMobile) {
          return slide?.desktop.uri !== "/waterfall.mp4";
        }
      });


      setDisplaySlides(displaySlides);
    }, [isMobile]);

    const initialSlide = slide
      ? displaySlides?.map((e) => e.id).indexOf(slide)
      : 0;

    useEffect(() => {
      if (!active) {
        // setMute(true);
        swiper?.autoplay?.stop();
      } else {
        swiper?.autoplay.start();
        // setMute(false);
      }
    }, [active]);

    useEffect(() => { }, [currentSlide]);

    useEffect(() => {
      if (QROpen || shareOpen) {
        swiper?.autoplay.stop();
      } else {
        if (displaySlides.length > 0) {
          const isCurrentImage =
            displaySlides[currentSlide][
              isMobile ? "mobile" : "desktop"
            ].content_type.split("/")[0] == "image";
          if (isCurrentImage) {
            swiper?.autoplay.start();
          }
        }
      }
    }, [QROpen, shareOpen]);
    function navigateToSlide(id) {
      const slideIndex = displaySlides?.findIndex((slide) => slide.id === id);
      if (swiper) {
        swiper.slideTo(slideIndex);
      }
    }
    function navigateToSection(id: string) {
      if (id === "slides") {
        parentSwiper.slideTo(0);
        return;
      }
      const sectionIndex = sectionMap[id.toLowerCase()];
      if (swiper) {
        parentSwiper.slideTo(sectionIndex);
      }
    }
    const handleSlideUrl = (s) => {
      if (
        s.activeIndex === previousSlideIndex &&
        s.previousIndex > s.activeIndex
      ) {
        setAutoPlay(false);
        swiper.autoplay.stop();
      } else {
        setAutoPlay(true);
        swiper?.autoplay?.start();
      }
      setPreviousSlideIndex(s.previousIndex);

      const symbol = path.includes("?") ? "?" : "?";
      // alert(`${symbol}slide=${displaySlides?.map((e) => e.id)[s.realIndex]}`)
      updateSlide(displaySlides?.map((e) => e.id)[s.realIndex]);
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
          lazy={true}
          // loop={true}
          // effect="fade"
          rewind={true}
          onLoad={() => { }}
          slidesPerView={1}
          initialSlide={initialSlide}
          onSlideChange={(s) => {
            //console.log("active index =>", s.activeIndex);
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

            // setMute(true);
            const isCurrentImage =
              displaySlides[s.realIndex][
                isMobile ? "mobile" : "desktop"
              ].content_type.split("/")[0] == "image";

            if (sliderPlay && isCurrentImage) {
              swiper?.autoplay?.start();
            }
            setCurrentSlide(s.realIndex);
          }}
          speed={1000}
          autoplay={false}
          onSwiper={(swiper) => {
            swiper.loopDestroy();
            setSwiper(swiper);
          }}
          // effect='fade'
          className={clsx(Styles.vreelSlider)}
        >
          {displaySlides.map((obj, index) => {
            // const isActive = currentSlide == index;
            // return <TestCom isActive={isActive} index={index} />;

            return (
              <SwiperSlide key={index} className={Styles.vreelSlide}>
                {({ isDuplicate }) => {
                  // console.log({ isDuplicate, index });
                  // if (isDuplicate) return <div></div>;
                  if (fonts)
                    return (
                      <HeroSlide
                        setAutoplay={setAutoPlay}
                        headerText={headerText}
                        navigateToSlide={navigateToSlide}
                        slide={obj}
                        heroIsActive={heroSlide.isActive}
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
                        isSection={isSection}
                        muteAudio={muteAudio}
                        playAudio={playAudio}
                        displayOptions={{
                          titleFontName:
                            displayOptions?.title?.family || "Poppins",
                          buttonFontName:
                            displayOptions?.button?.family || "Poppins",
                          descriptionFontName:
                            displayOptions?.description?.family || "Poppins",
                          default_logo,
                        }}
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
