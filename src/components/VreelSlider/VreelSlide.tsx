import React, { useEffect, useRef, useState } from "react";
import type { VreelSlideProps } from "../../types";
import { rightSidebar } from "./SlideData";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "../../redux/store/store";
import UserProfile from "../common/UserProfile";
import Styles from "./VreelSlider.module.scss";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { openBottomSheet } from "src/redux/createSlice/bottomSheetSlice";

const VreelSlide = ({
  swiper,
  currentSlide,
  slide,
  slideId,
  isUserName,
}: VreelSlideProps): JSX.Element => {
  const [mute, setMute] = useState<boolean>(true);
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.vreelSlide__container}>
      {/* USER PROFILE */}
      {cookies.userAuthToken && userAuthenticated && <UserProfile />}

      <div className={Styles.vreelSlide__content}>
        <div className={Styles.vreelSlide__content_wrapper}>
          {/* LEFT SIDEBAR */}
          <div className={Styles.vreelSlide__content_wrapper__left}>
            <img
              className={Styles.vreelLogo}
              src="/assets/icons/Vreel_logo_small.svg"
              alt="Brand Logo"
            />

            <button onClick={() => setMute(!mute)}>
              <img
                src={`/assets/${
                  mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                }`}
                alt="Mute Icon"
              />
            </button>
          </div>

          {/* CONTENT */}
          <div className={Styles.vreelSlide__content_wrapper__middle}>
            <div
              className={Styles.vreelSlide__content_wrapper__middle_container}
            >
              <h3>VREEL™</h3>
              <p>
                We make you look better! Our Web 3.0 storytelling interface
                visually elevates your brand.{" "}
              </p>

              {!isUserName && (
                <div>
                  {!userAuthenticated && (
                    <div className={Styles.button_container}>
                      <button
                        className="btn-slide"
                        onClick={() => router.push("/login")}
                      >
                        Log in
                      </button>

                      <button
                        className="btn-slide"
                        onClick={() => router.push("/register")}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className={Styles.vreelSlide__content_wrapper__right}>
            <div>
              {rightSidebar.topIcons.map((icon, index) => (
                <button key={index} onClick={() => icon.method(dispatch)}>
                  <img src={icon.src} alt={icon.alt} />
                </button>
              ))}
            </div>

            <div>
              {rightSidebar.bottomIcons.map((icon, index) => (
                <button key={index} onClick={() => icon.method(dispatch)}>
                  <img src={icon.src} alt={icon.alt} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={Styles.vreelSlide__content__bottomSheet}>
          <button
            onClick={() => {
              dispatch(openBottomSheet(true));
            }}
          ></button>
        </div>
      </div>

      {/* VIDEO PLAYER */}
      <ReactPlayer
        playing={true}
        muted={mute}
        url={slide.src}
        playsinline={true}
        config={{
          file: {
            attributes: {
              autoPlay: true,
              playsInline: true,
              muted: mute,
              type: "video/mp4",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -2,
                height: "100%",
                width: "100%",
                objectFit: "cover",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default VreelSlide;
