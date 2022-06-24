import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Styles from "./HeroSlider.module.scss";
import type { VreelSlideProps } from "../../../../types";

import { RootState, useAppDispatch } from "@redux/store/store";
import {
  expandMenu,
  expandQR,
  expandShare,
} from "@redux/createSlice/createMenuSlice";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UserProfile from "@shared/UserProfile/UserProfile";

const FollowMutation = gql`
  mutation follow($token: String!, $target: String!) {
    follow(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const unFollowMutation = gql`
  mutation follow($token: String!, $target: String!) {
    unFollow(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const likeMutation = gql`
  mutation follow($token: String!, $target: String!) {
    likeSlide(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const unlikeMutation = gql`
  mutation follow($token: String!, $target: String!) {
    likeSlide(input: { target: $target, token: $token }) {
      succeeded
      message
    }
  }
`;
const HeroSlide = ({
  swiper,
  currentSlide,
  current,
  slide,
  slideId,
  autoPlay = true,
  setAutoPlay,
  parentSwiper,
  index,
  mute,
  setMute,
}: VreelSlideProps): JSX.Element => {
  const [following, setfollowing] = useState(false);
  const [like, setlike] = useState(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const { heart } = useSelector((state: RootState) => state.heroBannerSlice);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [follow] = useMutation(FollowMutation);
  const [unfollow] = useMutation(unFollowMutation);
  const [like_fun] = useMutation(likeMutation);
  const [unlike_fun] = useMutation(unlikeMutation);
  const { title, id, cta1, cta2, advanced, desktop, mobile } = slide;
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const item = isMobile ? mobile : desktop;
  const isImage = item.content_type == "image";
  const { username, section, employee } = router?.query;
  console.log("hero slider renderd.....");
  // console.log({ current, index });

  return (
    <div id={id ? id : slideId} className={Styles.vreelSlide__container}>
      {
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: "10",
          }}
        >
          {isImage ? (
            <img
              className={Styles.image}
              src={item.uri}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              {current == index && (
                <ReactPlayer
                  playing={current == index}
                  muted={mute}
                  url={item?.uri}
                  //   url="/assets/videos/test-video-3.mp4"
                  playsinline={current == index}
                  // stopOnUnmount={true}
                  onSeek={() => console.log(`${section} video ${index} seek`)}
                  onReady={() =>
                    console.log(`${section} video ${index} ready to play`)
                  }
                  onPlay={() =>
                    console.log(`${section} video ${index} playing`)
                  }
                  onStart={() =>
                    console.log(`${section} video ${index} started`)
                  }
                  onPause={() =>
                    console.log(`${section} video ${index} Paused`)
                  }
                  onEnded={() => {
                    console.log(`${section} video ${index} Ended`);
                    swiper.slideNext();
                  }}
                  config={{
                    file: {
                      attributes: {
                        autoPlay: current == index,
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
            </>
          )}
        </div>
      }
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

              <button onClick={() => setMute(!mute)} style={{ height: "64px" }}>
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
              {(cta1?.link_header || cta2?.link_header) && (
                <div>
                  {
                    <div className={Styles.button_container}>
                      {cta1?.link_header && (
                        <button
                          className="btn-slide"
                          onClick={() => {
                            switch (cta1?.link_type) {
                              case "URL":
                                console.log(
                                  "url clicked..........",
                                  cta1?.link_url
                                );
                                router.push(cta1?.link_url);

                                break;

                              default:
                                break;
                            }
                          }}
                        >
                          {cta1?.link_header}
                        </button>
                      )}

                      {cta2.link_header && (
                        <button
                          className="btn-slide"
                          onClick={() => {
                            switch (cta2.link_type) {
                              case "URL":
                                console.log(
                                  "url clicked..........",
                                  cta1?.link_url
                                );
                                router.push(cta2?.link_url);
                                break;

                              default:
                                break;
                            }
                          }}
                        >
                          {cta2.link_header}
                        </button>
                      )}
                    </div>
                  }
                </div>
              )}
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
              <button
                onClick={() => {
                  if (!following) {
                    follow({
                      variables: {
                        token: cookies.userAuthToken,
                        target: slide.id,
                      },
                    })
                      .then((res) => {
                        toast.success("Following succeeded!");
                        setfollowing(true);
                      })
                      .catch((err) => {});
                  } else {
                    unfollow({
                      variables: {
                        token: cookies.userAuthToken,
                        target: slide.id,
                      },
                    })
                      .then((res) => {
                        toast.success("Unfollow succeeded!");
                        setfollowing(false);
                      })
                      .catch((err) => {});
                  }
                }}
              >
                {/* following.svg */}
                {following ? (
                  <img src="/assets/following.svg" alt="Following Icon" />
                ) : (
                  <img src="/assets/icons/icon-follow.svg" alt="Follow Icon" />
                )}
              </button>
              <button
                onClick={async () => {
                  // const res = await fetch("/api/vcard").then((res) =>
                  //   res.json()
                  // );
                  // console.log({ res });
                }}
              >
                {/* &&interprise=&&employeeid= */}
                <a
                  href={
                    employee
                      ? `/api/vcard?username=${username}&employee=${employee}`
                      : `/api/vcard?username=${username}`
                  }
                >
                  <img src="/assets/icons/vcard.svg" alt="V-Card Icon" />
                </a>
              </button>
            </div>

            <div>
              {/*  <button onClick={() => dispatch(expandInfo())}>
                <img src="/assets/icons/icon-info.svg" alt="Info Icon" />
              </button> */}
              <button
                onClick={() => {
                  if (!like) {
                    like_fun({
                      variables: {
                        token: cookies.userAuthToken,
                        target: slide.id,
                      },
                    })
                      .then((res) => {
                        // toast.success("Following succeeded!");
                        setlike(true);
                      })
                      .catch((err) => {});
                  } else {
                    unlike_fun({
                      variables: {
                        token: cookies.userAuthToken,
                        target: slide.id,
                      },
                    })
                      .then((res) => {
                        // toast.success("Unfollow succeeded!");
                        setlike(false);
                      })
                      .catch((err) => {});
                  }
                }}
              >
                <img
                  src={`/assets/icons/heart-${like ? "fill" : "empty"}.svg`}
                  alt="like Icon"
                />
              </button>
              <button
                onClick={() => {
                  dispatch(expandShare());
                  setAutoPlay(false);
                }}
              >
                <img src="/assets/icons/share-plan.svg" alt="Share Icon" />
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
    </div>
  );
};

export default HeroSlide;

/* 

 {!item.uri && (
            <div
              style={{
                height: "100%",
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                margin: "0 auto",
              }}
            >
              <span>
                No Slide Media for <br />
                {isMobile ? "mobile" : "desktop"} selected
              </span>
            </div>
          )}
*/

/* <ReactPlayer
              onReady={() => {}}
              playing={true}
              muted={mute}
              // light={true}
              url={item.uri}
              // url="/assets/videos/test-video-3.mp4"
              playsinline={true}
              onEnded={() => {
                swiper.slideNext();
              }}
              config={{
                file: {
                  attributes: {
                    autoPlay: false,
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
            /> */
