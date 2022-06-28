import {
  useEffect,
  useRef,
  useState,
  Suspense,
  lazy,
  CSSProperties,
} from "react";
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

import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { Loader } from "@shared/Loader/Loader";
import HeroSlide from "./HeroSlide/HeroSlide";

const HeroSlider: React.FC<{
  view: "Mobile" | "Desktop";
  slides?: any;
  parentSwiper?: any;
}> = ({ view, slides, parentSwiper }) => {
  const state = useSelector((state: RootState) => state.expandMenu);
  const { height, width } = useWindowDimensions();
  const [duration, setDuration] = useState(10000);
  const isMobile = width < 500;
  const [currentSlide, setCurrentSlide] = useState(null);
  const [prevSlide, setPrevSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();
  const [autoPlay, setautoPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mute, setMute] = useState<boolean>(true);
  const { slide, username, section, employee } = router.query;

  const slidesData = slides.filter((e) =>
    isMobile ? e.mobile.uri : e.desktop.uri
  );
  // console.log({ slides });
  slidesData.sort((a, b) => a.slide_location - b.slide_location);
  const initialSlide = slide ? slidesData?.map((e) => e.id).indexOf(slide) : 0;
  // console.log({ slidesData: slidesData.map((e) => e.id), slide, initialSlide });
  console.log(slidesData.map((e) => e.slide_location));

  const item = isMobile
    ? slidesData[currentSlide]?.mobile
    : slidesData[currentSlide]?.desktop;
  // console.log("Slides", { slides });
  // console.log(state);
  function hangleDuration() {
    if (item?.content_type != "image") {
      let media = new Audio(item?.uri);
      media.onloadedmetadata = function () {
        console.log(media.duration);
        setDuration(media.duration * 1000);
        console.log("Hello for slide chagne....", currentSlide, media.duration);
      };
    } else {
      setDuration(10000);
    }
  }
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
  useEffect(() => {
    /* if (item?.content_type != "image") {
      let media = new Audio(item?.uri);
      media.onloadedmetadata = function () {
        console.log(media.duration);
        setDuration(media.duration * 1000);
        console.log("Hello for slide chagne....", currentSlide, media.duration);
      };
    } else {
      setDuration(5000);
    } */
  }, [currentSlide]);

  function setAutoPlay() {
    // if (autoPlay) {
    //   swiper.autoplay.stop();
    // } else {
    //   swiper.autoplay.start();
    // }
    // setautoPlay(!autoPlay);
  }
  // hello
  /*   if (swiper && section) {
    swiper.autoplay.stop();
  } */
  console.log(item, duration);
  // if (duration == 100) return <Loader />;
  console.log({
    autoPlay,
  });
  return (
    <div className="vslider" style={{ height: "100%", width: "100%" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination={{
          clickable: true,
        }}
        // lazy={true}
        onLoad={() => {}}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          // console.log("on change called....................");

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
          console.log({
            real: s.realIndex,
            prev: currentSlide,
            going_next: s.realIndex > currentSlide,
            autoPlay,
          });
          if (s.realIndex == 0 || currentSlide == 0) {
            setautoPlay(autoPlay);
          } else if (s.realIndex < currentSlide) {
            setautoPlay(false);
          } else {
            setautoPlay(true);
          }

          setCurrentSlide(s.realIndex);
        }}
        speed={1000}
        // autoplay={{
        //   delay: duration ? duration : 10000,
        // }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        // effect='fade'
        className={clsx(Styles.vreelSlider)}
      >
        {slidesData.map((obj, index) => (
          <SwiperSlide key={index} className={Styles.vreelSlide}>
            <HeroSlide
              slide={obj}
              currentSlide={currentSlide}
              swiper={swiper}
              parentSwiper={parentSwiper}
              slideId={index}
              index={index}
              autoPlay={autoPlay}
              setAutoPlay={setAutoPlay}
              setMute={setMute}
              mute={mute}
              playing={playing}
              setPlaying={setPlaying}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
// interpriseid/e/employeeid
