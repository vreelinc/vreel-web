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

const GallerySlider: React.FC<{
  items: any;
  children?: ReactNode;
  parentSwiper: any;
  title?: String;
}> = ({ items, children, parentSwiper, title }) => {
  const [mute, setMute] = useState<boolean>(true);
  const [playing, setPlaying] = useState(false);
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { username, section } = router?.query;
  const [autoPlay, setautoPlay] = useState(true);
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  function setAutoPlay() {
    if (autoPlay) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setautoPlay(!autoPlay);
  }

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
        autoplay={{
          delay: autoPlay ? 5000 : 15000,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        className={clsx(Styles.vreelSlider, Styles.vreelSlider_mobile)}
      >
        {items.map((slide, index: number) => {
          const { cta1, cta2, desktop, mobile } = slide;
          const isMobile = width < 500;
          const item = isMobile ? mobile : desktop;
          const isImage = item?.content_type == "image";

          return (
            <SwiperSlide key={index} className={Styles.vreelSlide}>
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
              <div className={Styles.heroSlide}>
                <div className={Styles.vreelSlide__content}>
                  <div className={Styles.vreelSlide__content_wrapper}>
                    {/* LEFT SIDEBAR */}
                    <div className={Styles.vreelSlide__content_wrapper__left}>
                      <div></div>
                      <div
                        className={
                          Styles.vreelSlide__content_wrapper__left__bottom
                        }
                      >
                        <button
                          onClick={() => {
                            setPlaying(!playing);
                            setAutoPlay();
                          }}
                          className={
                            Styles.vreelSlide__content_wrapper__left__bottom__pauseBtn
                          }
                        >
                          {playing ? (
                            <img
                              src="/assets/icons/pause.svg"
                              alt="Pause Icons"
                            />
                          ) : (
                            <div
                              className={
                                Styles.vreelSlide__content_wrapper__left__bottom__pauseBtn__playIcon
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

                        {!isImage && (
                          <button
                            style={{ marginTop: "1rem" }}
                            onClick={() => setMute(!mute)}
                          >
                            <img
                              src={`/assets/${
                                mute
                                  ? "icons/audioOff.svg"
                                  : "icons/audioOn.svg"
                              }`}
                              alt="Mute Icon"
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className={clsx(
                        Styles.vreelSlide__content_wrapper__middle
                      )}
                      id={Styles.middle}
                    >
                      <div
                        className={
                          Styles.vreelSlide__content_wrapper__middle__container
                        }
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
                                <button
                                  className="btn-slide"
                                  onClick={() => {}}
                                >
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

                {/* VIDEO PLAYER */}
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
                        section={section}
                        item={item}
                        currentSlide={swiper?.realIndex}
                        index={index}
                        url={item?.uri}
                        mute={mute}
                        swiper={swiper}
                        playing={playing}
                      />
                    )}
                  </div>
                }
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
