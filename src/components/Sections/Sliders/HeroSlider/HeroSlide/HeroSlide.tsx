import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import ReactPlayer from "react-player";
import Styles from "./HeroSlide.module.scss";

import { RootState } from "@redux/store/store";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UserProfile from "@shared/UserProfile/UserProfile";
import SliderContent from "../HelperComps/SliderContent/SliderContent";
import SliderVideo from "../HelperComps/SliderVideo/SliderVideo";
import SliderImage from "../HelperComps/SliderImage/SliderImage";

const HeroSlide = ({
  swiper,
  currentSlide,
  slide,
  slideId,
  parentSwiper,
  index,
  mute,
  setMute,
  playing,
  setPlaying,
}): JSX.Element => {
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const router = useRouter();
  const { title, id, cta1, cta2, advanced, desktop, mobile } = slide;
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const item = isMobile ? mobile : desktop;
  const isImage = item.content_type == "image";
  const { username, section, employee } = router?.query;
  useState;
  const vreel = useSelector((state: any) => state?.vreel?.vreel);

  return (
    <div id={id ? id : slideId} className={Styles.heroSlide}>
      {/* USER PROFILE */}
      {cookies.userAuthToken && userAuthenticated && (
        <div className={Styles.userProfile}>
          <UserProfile />
        </div>
      )}

      {/* SLIDER MEDIA */}
      {
        <div className={Styles.media}>
          {isImage ? (
            <SliderImage
              url={item.uri}
              background_audio_uri={item.background_audio_uri}
              mute={mute}
              swiper={swiper}
              currentSlide={currentSlide}
              index={index}
            />
          ) : (
            <SliderVideo
              playing={playing}
              section={section}
              item={item}
              currentSlide={currentSlide}
              index={index}
              url={item.content_type !== "image" && item?.uri}
              mute={mute}
              swiper={swiper}
            />
          )}
          {/* SLIDER CONTENT */}
          <SliderContent
            item={item}
            slide={slide}
            playing={playing}
            setPlaying={setPlaying}
            mute={mute}
            setMute={setMute}
            isImage={isImage}
            parentSwiper={parentSwiper}
          />
        </div>
      }
    </div>
  );
};

export default HeroSlide;
