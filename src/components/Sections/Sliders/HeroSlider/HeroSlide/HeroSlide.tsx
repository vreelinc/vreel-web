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
import { useSwiperSlide } from "swiper/react";

const HeroSlide = ({
  swiper,
  isActive,
  slide,
  slideId,
  parentSwiper,
  index,
  mute,
  setMute,
  playing,
  setPlaying,
  sliderPlay,
}): JSX.Element => {
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const router = useRouter();
  const { title, id, cta1, cta2, advanced, desktop, mobile } = slide;
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const [progress, setProgress] = useState(0);
  const item = isMobile ? mobile : desktop;
  const isImage = item.content_type.split("/")[0] == "image";
  const { username, section, employee } = router?.query;
  useState;
  const vreel = useSelector((state: any) => state?.vreel?.vreel);
  // console.log("2. HeroSlide rendered for..", index, { isActive });
  // console.log(progress);

  // return <div></div>;
  return (
    <div id={id ? id : slideId} className={Styles.heroSlide}>
      <div
        style={{
          borderBottom: "1px solid #ff7a00",
          width: `${progress * 100}%`,
          position: "absolute",
          bottom: "0",
          zIndex: "2",
        }}
      ></div>
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
              isActive={isActive}
              index={index}
            />
          ) : (
            <SliderVideo
              playing={playing}
              section={section}
              item={item}
              isActive={isActive}
              index={index}
              url={item.content_type !== "image" && item?.uri}
              mute={mute}
              swiper={swiper}
              sliderPlay={sliderPlay}
              setProgress={setProgress}
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

export default React.memo(HeroSlide);
