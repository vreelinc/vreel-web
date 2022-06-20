import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "./CommonSlider.module.scss";
import { FaPause, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch } from "src/redux/store/store";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";

const CommonSlider: React.FC<{ item: any; parentSwiper: any }> = ({
  item,
  parentSwiper,
}) => {
  const [mute, setMute] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className={Styles.vreelSlide__container}>
      {item.content_type === "image" && (
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
            src={item.uri}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <div
        className={Styles.vreelSlide__content}
        style={{ padding: "1rem 3rem" }}
      >
        <div className={Styles.menuContainer}>
          <p>{item.content_type}</p>
          <div
            className={Styles.menuContainer__menu}
            onClick={() => dispatch(expandMenu())}
          >
            <HiOutlineMenu />
          </div>
        </div>
        <div className={Styles.vreelSlide__content_wrapper}>
          {/* LEFT SIDEBAR */}
          <div className={Styles.vreelSlide__content_wrapper__left}>
            <div></div>

            <div
              className={Styles.vreelSlide__content_wrapper__left__bottom}
              style={{ marginBottom: "2rem" }}
            >
              <button
                onClick={() => setPause(!pause)}
                className={
                  Styles.vreelSlide__content_wrapper__left__bottom__pauseBtn
                }
              >
                {pause ? <FaPause /> : <FaPlay />}
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
          <div
            className={Styles.vreelSlide__content_wrapper__middle}
            style={{ marginBottom: "2rem" }}
          >
            <div
              className={Styles.vreelSlide__content_wrapper__middle__container}
            >
              <h3>{item?.header ? item.header : "VREEL™"}</h3>
              <p>
                {item?.description
                  ? item.description
                  : "We make you look better! Our Web3 interface curates and displays your story amazingly."}
              </p>

              {
                <div>
                  {
                    <div className={Styles.button_container}>
                      <button
                        className="btn-slide"
                        onClick={() => router.push("/register")}
                      >
                        Sign Up
                      </button>
                      <button className="btn-slide" onClick={() => {}}>
                        Learn More
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
          {parentSwiper?.realIndex !==
            parseInt(parentSwiper?.slides?.length) - 1 && (
            <div
              className={Styles.carrotDown}
              onClick={() => {
                parentSwiper.slideNext();
              }}
            >
              <img
                src="/assets/icons/carrot-down.svg"
                alt="Carrot Down images"
              />
            </div>
          )}
          {/* RIGHT SIDEBAR */}
        </div>
      </div>
      {/* VIDEO PLAYER */}
      {item.content_type == "video" && (
        <ReactPlayer
          playing={pause}
          muted={mute}
          url={item.uri}
          //   url="/assets/videos/test-video-3.mp4"
          playsinline={true}
          config={{
            file: {
              attributes: {
                autoPlay: true,
                playsInline: true,
                muted: mute,
                type: "video",
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

export default CommonSlider;
