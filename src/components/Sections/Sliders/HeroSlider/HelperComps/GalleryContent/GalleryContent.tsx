import { useRouter } from "next/router";
import React from "react";
import Styles from "../SliderContent/SliderContent.module.scss";

const GalleryContent = ({
  setPlaying,
  playing,
  isImage,
  setMute,
  mute,
  item,
}) => {
  const router = useRouter();
  return (
    <div className={Styles.media__content}>
      <div className={Styles.media__content_wrapper}>
        {/* LEFT SIDEBAR */}
        <div className={Styles.media__content_wrapper__left}>
          <div></div>
          <div className={Styles.media__content_wrapper__left__bottom}>
            <button
              onClick={() => {
                setPlaying(!playing);
              }}
              className={Styles.media__content_wrapper__left__bottom__pauseBtn}
            >
              {playing ? (
                <img src="/assets/icons/pause.svg" alt="Pause Icons" />
              ) : (
                <div
                  className={
                    Styles.media__content_wrapper__left__bottom__pauseBtn__playIcon
                  }
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src="/assets/icons/play.svg"
                    alt="Play Icons"
                  />
                </div>
              )}
            </button>
            {(item.background_audio_uri || !isImage) && (
              <button
                onClick={() => {
                  setMute(!mute);
                }}
                style={{ marginTop: "1rem" }}
                className={Styles.media__content_wrapper__left__bottom__muteBtn}
              >
                <img
                  src={`/assets/${
                    mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                  }`}
                  alt="Mute Icon"
                />
              </button>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={Styles.media__content_wrapper__middle}
          id={Styles.middle}
          style={{ marginBottom: "1rem" }}
        >
          <div className={Styles.media__content_wrapper__middle__container}>
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

        {/* RIGHT SIDEBAR */}
        <div style={{ width: "32px" }}></div>
      </div>
    </div>
  );
};

export default GalleryContent;
