import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import ReactPlayer from "react-player";
import Styles from "./HeroSlide.module.scss";
import dynamic from "next/dynamic";

import { RootState, useAppDispatch } from "@redux/store/store";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UserProfile from "@shared/UserProfile/UserProfile";
import { VreelSlideProps } from "../../../../../types";
import SliderContent from "../HelperComps/SliderContent/SliderContent";

import SliderImage from "../HelperComps/SliderImage/SliderImage";

const SliderVideo = dynamic(
  () => import("../HelperComps/SliderVideo/SliderVideo")
);

const HeroSlide = ({
  swiper,
  currentSlide,
  slide,
  slideId,
  autoPlay = true,
  setAutoPlay,
  parentSwiper,
  index,
  mute,
  setMute,
}: VreelSlideProps): JSX.Element => {
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const router = useRouter();
  const { title, id, cta1, cta2, advanced, desktop, mobile } = slide;

  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const item = desktop;
  const isImage = item.content_type == "image";
  const { username, section, employee } = router?.query;
  const vreel = useSelector((state: any) => state?.vreel?.vreel);
  const [playing, setPlaying] = useState(autoPlay);
  const videoRef = useRef(null);

  return (
    <div id={id ? id : slideId} className={Styles.heroSlide}>
      {/* USER PROFILE */}
      {cookies.userAuthToken && userAuthenticated && <UserProfile />}

      {/* SLIDER CONTENT */}
      <SliderContent
        item={item}
        slide={slide}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        mute={mute}
        setMute={setMute}
        isImage={isImage}
        parentSwiper={parentSwiper}
      />

      {/* SLIDER MEDIA */}
      {
        <div className={Styles.media}>
          {isImage ? (
            <SliderImage url={item.uri} />
          ) : (
            <SliderVideo
              section={section}
              item={item}
              currentSlide={currentSlide}
              index={index}
              url={item?.uri}
              mute={mute}
              swiper={swiper}
            />
          )}
        </div>
      }
    </div>
  );
};

export default HeroSlide;
