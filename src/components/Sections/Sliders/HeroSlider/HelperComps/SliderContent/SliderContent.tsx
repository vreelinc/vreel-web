import React, { useState } from "react";
import { useRouter } from "next/router";
import Styles from "./SliderContent.module.scss";
import { RootState, useAppDispatch } from "@redux/store/store";
import {
  expandMenu,
  expandQR,
  expandShare,
} from "@redux/createSlice/createMenuSlice";
import { getHeroSliderSchema } from "../../schema";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const { FollowMutation, unFollowMutation, likeMutation, unlikeMutation } =
  getHeroSliderSchema();

const SliderContent: React.FC<{
  item: any;
  slide: any;
  autoPlay: boolean;
  setAutoPlay: Function;
  mute: boolean;
  setMute: Function;
  isImage: boolean;
  parentSwiper: any;
  playing: boolean;
  setPlaying: Function;
}> = ({
  autoPlay,
  setAutoPlay,
  mute,
  setMute,
  isImage,
  item,
  slide,
  parentSwiper,
  playing,
  setPlaying,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [following, setfollowing] = useState(false);
  const [like, setlike] = useState(false);
  const [follow] = useMutation(FollowMutation);
  const [unfollow] = useMutation(unFollowMutation);
  const [like_fun] = useMutation(likeMutation);
  const [unlike_fun] = useMutation(unlikeMutation);
  const [cookies] = useCookies(["userAuthToken"]);
  const { username, section, employee } = router?.query;
  const vreel = useSelector((state: any) => state?.vreel?.vreel);
  const { title, id, cta1, cta2, advanced, desktop, mobile } = slide;
  console.log({ playing });

  return (
    <div className={Styles.vreelSlide__content}>
      <div className={Styles.vreelSlide__content_wrapper}>
        {/* logo */}
        <div className={Styles.vreelSlide__content_wrapper__vreelLogo}>
          <img
            src={
              vreel?.logo_uri
                ? vreel?.logo_uri
                : "/assets/icons/Vreel_logo_small.svg"
            }
            alt="Brand Logo"
          />
        </div>
        {/* LEFT SIDEBAR */}
        <div className={Styles.vreelSlide__content_wrapper__left}>
          <div></div>

          <div className={Styles.vreelSlide__content_wrapper__left__bottom}>
            {
              <button
                // onClick={videoPress}
                onClick={() => {
                  setPlaying(!playing);
                }}
                className={
                  Styles.vreelSlide__content_wrapper__left__bottom__pauseBtn
                }
              >
                {playing ? (
                  <img src="/assets/icons/pause.svg" alt="Pause Icons" />
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
            }

            {(item.background_audio_uri || !isImage) && (
              <button
                onClick={() => {
                  setAutoPlay();
                  setMute(!mute);
                }}
                style={{ marginTop: "1rem" }}
                className={
                  Styles.vreelSlide__content_wrapper__left__bottom__muteBtn
                }
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
          <div
            className={Styles.vreelSlide__content_wrapper__right__topContainer}
          >
            <button onClick={() => dispatch(expandMenu())}>
              <img src="/assets/icons/menu.svg" alt="Menu Icons" />
            </button>
            {/*  {<button
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
              
              {following ? (
                <img src="/assets/following.svg" alt="Following Icon" />
              ) : (
                <img src="/assets/icons/icon-follow.svg" alt="Follow Icon" />
              )}
            </button>} */}
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
                <img src="/assets/icons/vcard_small.svg" alt="V-Card Icon" />
              </a>
            </button>
          </div>

          <div>
            {/*  <button onClick={() => dispatch(expandInfo())}>
          <img src="/assets/icons/icon-info.svg" alt="Info Icon" />
        </button> */}
            {/* <button
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
            </button> */}
            <button
              onClick={() => {
                dispatch(expandShare());
                // setAutoPlay(false);
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
  );
};

export default SliderContent;
