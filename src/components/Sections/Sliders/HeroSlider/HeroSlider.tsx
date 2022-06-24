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
import HeroSlide from "./HeroSlide";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";

const HeroSlider: React.FC<{
  view: "Mobile" | "Desktop";
  slides?: any;
  parentSwiper?: any;
}> = ({ view, slides, parentSwiper }) => {
  const state = useSelector((state: RootState) => state.expandMenu);
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();
  const [autoPlay, setautoPlay] = useState(true);
  const [mute, setMute] = useState<boolean>(true);
  const { slide, username, section, employee } = router.query;
  console.log("Slides", { slides });
  console.log(state);

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

  function setAutoPlay() {
    if (autoPlay) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setautoPlay(!autoPlay);
  }
  // hello
  /*   if (swiper && section) {
    swiper.autoplay.stop();
  } */
  const slidesData = slides.filter((e) =>
    isMobile ? e.mobile.uri : e.desktop.uri
  );
  // console.log({ slides });
  slidesData.sort((a, b) => a.slide_location - b.slide_location);
  const initialSlide = slide ? slidesData?.map((e) => e.id).indexOf(slide) : 0;
  console.log({ slidesData: slidesData.map((e) => e.id), slide, initialSlide });

  return (
    <div className="vslider" style={{ height: "100%", width: "100%" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination={{
          clickable: true,
        }}
        lazy={true}
        onLoad={() => {}}
        slidesPerView={1}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          console.log("on change called....................");

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
          setCurrentSlide(s.realIndex);
        }}
        speed={1000}
        autoplay={{
          delay: 20000,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        // effect='fade'
        className={clsx(Styles.vreelSlider)}
      >
        {slidesData.map((obj, index) => (
          <SwiperSlide key={index} className={Styles.vreelSlide}>
            <HeroSlide
              current={currentSlide}
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
// interpriseid/e/employeeid
