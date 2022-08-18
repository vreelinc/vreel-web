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
  isVisiable: boolean;
}> = ({ items, parentSwiper, title }) => {
  const [mute, setMute] = useState<boolean>(true);
  const [playing, setPlaying] = useState(true);
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { username, section } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  // console.log("Gallery slider render.........", items);

  return (
    <div className="videoSlider" style={{ height: "100%", width: "100%" }}>
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        pagination={{
          clickable: true,
        }}
        rewind={true}
        slidesPerView={1}
        speed={1500}
        onSlideChange={(s) => {
          setMute(true);
          setCurrentSlide(s.realIndex);
        }}
        autoplay={{
          delay: 3000,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
      >
        {items.map((slide, index: number) => {
          const { cta1, cta2, desktop, mobile } = slide;
          const isMobile = width < 500;
          const item = isMobile ? mobile : desktop;
          const isImage = item.content_type.split("/")[0] == "image";
          // const isImage = item?.content_type == "image";
          const isActive = currentSlide == index;

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
                    isActive={isActive}
                    index={index}
                  />
                ) : (
                  <SliderVideo
                    section={section}
                    item={item}
                    isActive={isActive}
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
                  slide={slide}
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
