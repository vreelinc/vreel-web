import React, { useState } from "react";
import type { VreelSlideProps } from "../../types";
import { rightSidebar } from "./SlideData";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { FaPause, FaPlay } from "react-icons/fa";
import { RootState, useAppDispatch } from "../../redux/store/store";
import UserProfile from "../common/UserProfile";
import Styles from "./VreelSlider.module.scss";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import {
  expandInfo,
  expandMenu,
  expandQR,
  expandShare,
} from "src/redux/createSlice/createMenuSlice";
import { heartReducers } from "src/redux/createSlice/HeroBannerSlice";
import { HiOutlineMenu } from "react-icons/hi";

const VreelSlide = ({
  swiper,
  currentSlide,
  slide,
  slideId,
  autoPlay = true,
  setAutoPlay,
  parentSwiper,
}: VreelSlideProps): JSX.Element => {
  const [mute, setMute] = useState<boolean>(true);
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const { heart } = useSelector((state: RootState) => state.heroBannerSlice);
  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log({ parentSwiper });

  const { title, desktop, id } = slide;
  const uri = id
    ? desktop.uri == "/waterfall.mp4"
      ? "/assets/videos/" + desktop.uri
      : desktop.uri
    : slide.uri;
  const isImage =
    slide.content_type == "image" || desktop?.content_type == "image";
  const isVideo =
    slide.content_type == "video" || desktop?.content_type == "video";

  return (
    <div id={id ? id : slideId} className={Styles.vreelSlide__container}>
      {isImage && (
        <div
          className={Styles.image_container}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: "10",
          }}
        >
          <img
            className={Styles.image}
            src={desktop.uri}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
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

            <div className={Styles.vreelSlide__content_wrapper__left__bottom}>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={
                  Styles.vreelSlide__content_wrapper__left__bottom__pauseBtn
                }
              >
                {autoPlay ? <FaPause /> : <FaPlay />}
              </button>

              <button onClick={() => setMute(!mute)}>
                <img
                  src={`/assets/${
                    mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                  }`}
                  alt="Mute Icon"
                />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className={Styles.vreelSlide__content_wrapper__middle}>
            <div
              className={Styles.vreelSlide__content_wrapper__middle__container}
            >
              <h3>{title?.header ? title.header : "VREEL™"}</h3>
              <p>
                {title?.description
                  ? title.description
                  : "We make you look better! Our Web3 interface curates and displays your story amazingly."}
              </p>

              {!id && (
                <div>
                  {
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
                  }
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className={Styles.vreelSlide__content_wrapper__right}>
            <div>
              <button onClick={() => dispatch(expandMenu())}>
                <HiOutlineMenu
                  className={Styles.vreelSlide__content_wrapper__right__menu}
                />
              </button>
              <button onClick={() => {}}>
                <img src="/assets/icons/icon-follow.svg" alt="Follow Icon" />
              </button>
              <button onClick={() => {}}>
                <img src="/assets/icons/icon-address.svg" alt="V-Card Icon" />
              </button>
            </div>

            <div>
              <button onClick={() => dispatch(expandInfo())}>
                <img src="/assets/icons/icon-info.svg" alt="Info Icon" />
              </button>
              <button onClick={() => dispatch(heartReducers())}>
                <img
                  src={`/assets/icons/icon-heart-${
                    heart ? "filled" : "not-filled"
                  }.svg`}
                  alt="like Icon"
                />
              </button>
              <button onClick={() => dispatch(expandShare())}>
                <img src="/assets/icons/icon-share.svg" alt="Share Icon" />
              </button>
              <button onClick={() => dispatch(expandQR())}>
                <img src="/assets/icons/icon-qr.svg" alt="QR Icon" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={Styles.vreelSlide__content__bottomSheet}
          onClick={() => {
            parentSwiper.slideNext();
          }}
        >
          <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
        </div>
      </div>
      {/* VIDEO PLAYER */}
      {isVideo && (
        <ReactPlayer
          playing={true}
          muted={mute}
          url={uri}
          // url="/assets/videos/test-video-3.mp4"
          playsinline={true}
          config={{
            file: {
              attributes: {
                autoPlay: true,
                playsInline: true,
                muted: mute,
                type: id ? desktop.content_type : "video",
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
      )}
    </div>
  );
};

export default VreelSlide;
