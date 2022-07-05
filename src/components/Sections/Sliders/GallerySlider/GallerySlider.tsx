import React, { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Styles from "./GallerySlider.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import clsx from "clsx";
import { useAppDispatch } from "src/redux/store/store";
import { useRouter } from "next/router";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import MainContainer from "@sections/MainContainer/MainContainer";
import SliderImage from "../HeroSlider/HelperComps/SliderImage/SliderImage";
import SliderVideo from "../HeroSlider/HelperComps/SliderVideo/SliderVideo";
import GalleryContent from "../HeroSlider/HelperComps/GalleryContent/GalleryContent";

const GallerySlider: React.FC<{
  items: any;
  children?: ReactNode;
  parentSwiper: any;
  title?: String;
}> = ({ items, parentSwiper, title }) => {
  const [mute, setMute] = useState<boolean>(true);
  const [playing, setPlaying] = useState(false);
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { username, section } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  return (
    <div className="videoSlider" style={{ height: "100%", width: "100%" }}>
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        speed={1500}
        onSlideChange={(s) => {
          // console.log("on change called....................");

          if (s.realIndex == 0 || currentSlide == 0) {
            // setsliderPlay(sliderPlay);
          } else if (s.realIndex < currentSlide) {
            swiper.autoplay.stop();
            console.log(
              "onSlideChange -> auto play stopped for.....",
              s.realIndex
            );
            // setSliderPlay(false);
          } else {
            console.log(
              "onSlideChange -> auto play started for.....",
              s.realIndex
            );
            swiper?.autoplay.start();
          }
          setMute(true);
          setCurrentSlide(s.realIndex);
        }}
        autoplay={{
          delay: 5000,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
      >
        {items.map((slide, index: number) => {
          const { cta1, cta2, desktop, mobile } = slide;
          const isMobile = width < 500;
          const item = isMobile ? mobile : desktop;
          const isImage = item?.content_type == "image";

          return (
            <SwiperSlide key={index} className={Styles.gallerySlide}>
              <div className={Styles.menuContainer}>
                <p>{title}</p>
                <button
                  className={Styles.menuContainer__menu}
                  onClick={() => dispatch(expandMenu())}
                >
                  <img src="/assets/icons/menu.svg" alt="Menu Bar" />
                </button>
              </div>
              <div
                className={Styles.carrotDown}
                onClick={() => {
                  parentSwiper?.slideNext();
                }}
              >
                <img
                  src="/assets/icons/carrot-down.svg"
                  alt="Carrot Down images"
                />
              </div>

              <div className={Styles.galleryMedia}>
                {isImage ? (
                  <SliderImage
                    url={item.uri}
                    background_audio_uri={item.background_audio_uri}
                    mute={mute}
                    swiper={swiper}
                    isActive={false}
                    index={index}
                  />
                ) : (
                  <SliderVideo
                    section={section}
                    item={item}
                    isActive={false}
                    index={index}
                    url={item?.uri}
                    mute={mute}
                    swiper={swiper}
                    playing={playing}
                  />
                )}

                <GalleryContent
                  setPlaying={setPlaying}
                  playing={playing}
                  isImage={isImage}
                  setMute={setMute}
                  mute={mute}
                  item={item}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default GallerySlider;
// some text
