import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Styles from "./SliderContent.module.scss";
import ReactHtmlParser from "react-html-parser";
import SectionStyles from "../../../../SectionContainer/SectionContainer.module.scss";
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
import IcecastMetadataPlayer from "icecast-metadata-player";

const { FollowMutation, unFollowMutation, likeMutation, unlikeMutation } =
  getHeroSliderSchema();

const SliderContent: React.FC<{
  item: any;
  slide: any;
  mute: boolean;
  setMute: Function;
  isImage: boolean;
  parentSwiper: any;
  playing: boolean;
  setPlaying: Function;
  navigateToSection: (s: string) => void;
  navigateToSlide: (id: string) => void;
  isSection: boolean;
  headerText: string;
  displayOptions: any;
  defaultLogo?: string;
  hasBackgroundAudio: boolean;
}> = ({
  mute,
  setMute,
  isImage,
  item,
  slide,
  parentSwiper,
  playing,
  setPlaying,
  navigateToSection,
  navigateToSlide,
  isSection,
  headerText,
  hasBackgroundAudio,
  displayOptions,
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
  const [audioElement] = useState(new Audio());
  const [text, setText] = useState(0);
  const [icecast, setIcecast] = useState<IcecastMetadataPlayer | null>();
  const { username, section, employee } = router?.query;
  const [fonts, setFonts] = useState({
    button: "Poppins",
    title: "Poppins",
    description: "Poppins",
  });
  const vreel = useSelector((state: any) => state?.vreel?.vreel);
  const { titleFontName, descriptionFontName, buttonFontName } = displayOptions;

  const {
    title,
    logo_visible,
    id,
    cta1,
    cta2,
    cta3,
    advanced: { logoUrl, isDarkMode },
    desktop,
    mobile,
  } = slide;
  useEffect(() => {
    if (cta1 || cta2) {
      if (cta1?.link_header.length > 10 || cta2?.link_header.length > 10) {
        setText(13);
      } else {
        setText(8);
      }
    }
  }, [text]);
  useEffect(() => {
    if (icecast) {
      if (mute) {
        icecast.stop();
      } else {
        icecast.play();
      }
    }
  }, [mute]);

  return (
    <div
      className={Styles.media__content}
      style={
        {
          "--isDark": isDarkMode ? "invert(95%)" : "invert(0%)",
        } as CSSProperties
      }
    >
      <div className={Styles.media__content_wrapper}>
        {/* logo */}
        {logo_visible && !isSection && (
          <div
            style={{ width: "100%", position: "absolute", top: 0 }}
            className={Styles.media__content_wrapper__vreelLogo}
          >
            <img
              style={{ maxWidth: "67%", minHeight: "100px" }}
              src={
                logoUrl
                  ? logoUrl
                  : vreel?.display_options?.default_logo
                  ? vreel?.display_options?.default_logo
                  : "/assets/icons/Vreel_logo_small.svg"
              }
              alt="Brand Logo"
            />
          </div>
        )}
        {isSection && (
          <div
            style={{ position: "absolute" }}
            className={SectionStyles.sectionContainer__buttonTopContainer}
          >
            <h2 style={{ fontFamily: "headerFont" }}>{headerText}</h2>
          </div>
        )}
        {/* LEFT SIDEBAR */}
        <div className={Styles.media__content_wrapper__left}>
          <div></div>

          <div className={Styles.media__content_wrapper__left__bottom}>
            {!isImage ? (
              <button
                onClick={() => {
                  setPlaying(!playing);
                }}
                className={
                  Styles.media__content_wrapper__left__bottom__pauseBtn
                }
              >
                {playing ? (
                  <img src="/assets/icons/pause.svg" alt="Pause Icons" />
                ) : (
                  <div
                    className={
                      Styles.media__content_wrapper__left__bottom__pauseBtn
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
            ) : (
              <button>
                <div
                  className={
                    Styles.media__content_wrapper__left__bottom__pauseBtn__playIcon
                  }
                ></div>
              </button>
            )}
            {(hasBackgroundAudio || !isImage) && (
              <button
                onClick={() => {
                  setMute(!mute);
                  // if (!playing) {
                  //   setPlaying(true);
                  // }
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
            {isImage && (
              <div
                className={Styles.media__content_wrapper__left__bottom__muteBtn}
              ></div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={Styles.media__content_wrapper__middle}
          style={
            {
              "--marginBottom": `${
                parentSwiper?.activeIndex !==
                parseInt(parentSwiper?.slides?.length) - 1
                  ? 1.8
                  : 1
              }rem`,
            } as CSSProperties
          }
        >
          <div className={Styles.media__content_wrapper__middle__container}>
            <h3 style={{ fontFamily: titleFontName }}>{title?.header}</h3>

            <p style={{ fontFamily: descriptionFontName }}>
              {title?.description}
            </p>
            {cta1?.link_header && cta2?.link_header && cta3?.link_header ? (
              <div>
                {
                  <div className={Styles.button_container_2}>
                    <button
                      className="btn-employee"
                      onClick={() => {
                        window.open(cta1?.link_url, "_self");
                      }}
                    >
                      <img
                        src="/assets/icons/add_contact.svg"
                        alt="Contact Logo"
                      />
                      <span> {ReactHtmlParser(cta1?.link_header)}</span>
                    </button>
                    {cta2?.link_url !== "" && (
                      <button
                        className="btn-employee"
                        onClick={() => {
                          window.open(cta2?.link_url, "_blank");
                        }}
                      >
                        <img
                          src="/assets/icons/socials/linkedin.svg"
                          alt="LinkedIn Logo"
                        />
                        <span> {ReactHtmlParser(cta2?.link_header)}</span>
                      </button>
                    )}

                    {/*  {cta3.link_header && (
                      <button
                        className="btn-employee"
                        onClick={() => {
                          console.log(cta2);

                          switch (cta3.link_type) {
                            // case "URL":
                            case "":
                              if (cta3.link_url.includes("https://www"))
                                window.open(cta3?.link_url, "_blank");
                              else router.push(cta3?.link_url);
                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        <img
                          src="/assets/icons/share-plan.svg"
                          alt="Share Icons"
                        />
                        <span> {ReactHtmlParser(cta3?.link_header)}</span>
                      </button>
                    )} */}
                  </div>
                }
              </div>
            ) : (
              (cta1?.link_header || cta2?.link_header) && (
                <div>
                  {
                    <div
                      className={Styles.button_container}
                      style={
                        {
                          "--direction": `${text > 10 ? "column" : "row"}`,
                          "--marginBottom": `${text > 10 ? ".5" : ".2"}rem`,
                          "--marginRight": `${text > 10 ? "0" : "1"}rem`,
                        } as CSSProperties
                      }
                    >
                      {cta1?.link_header && (
                        <>
                          {(() => {
                            switch (cta1?.link_type.toLowerCase() || "url") {
                              case "call":
                                return (
                                  <a
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                    href={`tel:${cta1?.link_url}`}
                                  >
                                    {cta1?.link_header}
                                  </a>
                                );
                              case "email":
                                return (
                                  <a
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                    href={`mailto:${cta1?.link_url}`}
                                  >
                                    {cta1?.link_header}
                                  </a>
                                );
                              case "document":
                                return (
                                  <a
                                    target="_blank"
                                    onClick={() => alert(cta1?.link_url)}
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                    href={cta1?.link_url}
                                  >
                                    {cta1?.link_header}
                                  </a>
                                );
                              case "url":
                                return (
                                  <button
                                    className="btn-slide"
                                    style={{ fontFamily: buttonFontName }}
                                    onClick={() => {
                                      switch (cta1.link_type) {
                                        // case "URL":
                                        case "url":
                                        case "URL":
                                        case "":
                                          console.log(cta1.link_header?.trim());
                                          if (
                                            cta1.link_url.startsWith("https://")
                                          )
                                            cta1?.link_header?.trim() ===
                                            "LOGIN"
                                              ? window.open(
                                                  cta1?.link_url,
                                                  "_self"
                                                )
                                              : window.open(
                                                  cta1?.link_url,
                                                  "_blank"
                                                );
                                          else router.push(cta1?.link_url);
                                          break;

                                        default:
                                          break;
                                      }
                                    }}
                                  >
                                    {cta1?.link_header}{" "}
                                  </button>
                                );

                              case "slide":
                                return (
                                  <button
                                    style={{ fontFamily: buttonFontName }}
                                    className="btn-slide"
                                    onClick={() => {
                                      navigateToSlide(cta1?.link_url);
                                    }}
                                  >
                                    {cta1?.link_header}{" "}
                                  </button>
                                );
                              case "sections":
                                return (
                                  <button
                                    onClick={() =>
                                      navigateToSection(cta1.link_url)
                                    }
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                  >
                                    {cta1?.link_header}
                                  </button>
                                );
                            }
                          })()}
                        </>
                      )}

                      {cta2.link_header && (
                        // <button
                        //   className="btn-slide"
                        //   onClick={() => {
                        //     switch (cta2.link_type) {
                        //       // case "URL":
                        //       case "url":
                        //       case "URL":
                        //       case "":
                        //         if (cta2.link_url.startsWith("https://"))
                        //           window.open(cta2?.link_url, "_blank");
                        //         else router.push(cta2?.link_url);
                        //         break;

                        //       default:
                        //         break;
                        //     }
                        //   }}
                        // >
                        <>
                          {(() => {
                            switch (cta2?.link_type.toLowerCase() || "url") {
                              case "call":
                                return (
                                  <a
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                    href={`tel:${cta2?.link_url}`}
                                  >
                                    {cta2?.link_header}
                                  </a>
                                );
                              case "email":
                                return (
                                  <a
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                    href={`mailto:${cta2?.link_url}`}
                                  >
                                    {cta2?.link_header}
                                  </a>
                                );
                              case "url":
                                return (
                                  <button
                                    className="btn-slide"
                                    style={{ fontFamily: buttonFontName }}
                                    onClick={() => {
                                      switch (cta2.link_type) {
                                        // case "URL":
                                        case "url":
                                        case "URL":
                                        case "":
                                          if (
                                            cta2.link_url.startsWith("https://")
                                          )
                                            cta2?.link_header?.trim() ===
                                            "LOGIN"
                                              ? window.open(
                                                  cta2?.link_url,
                                                  "_self"
                                                )
                                              : window.open(
                                                  cta2?.link_url,
                                                  "_blank"
                                                );
                                          else router.push(cta2?.link_url);
                                          break;

                                        default:
                                          break;
                                      }
                                    }}
                                  >
                                    {cta2?.link_header}{" "}
                                  </button>
                                );
                              case "slide":
                                return (
                                  <button
                                    style={{ fontFamily: buttonFontName }}
                                    className="btn-slide"
                                    onClick={() => {
                                      navigateToSlide(cta2?.link_url);
                                    }}
                                  >
                                    {cta2?.link_header}{" "}
                                  </button>
                                );
                              case "sections":
                                return (
                                  <button
                                    onClick={() =>
                                      navigateToSection(cta2.link_url)
                                    }
                                    className="btn-slide"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontFamily: buttonFontName,
                                    }}
                                  >
                                    {cta2?.link_header}
                                  </button>
                                );
                            }
                          })()}
                        </>
                      )}
                    </div>
                  }
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className={Styles.media__content_wrapper__right}>
          <div className={Styles.media__content_wrapper__right__topContainer}>
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
                    ? `/api/vcard?username=${
                        username ? username : ""
                      }&employee=${employee}`
                    : `/api/vcard?username=${username ? username : ""}`
                }
              >
                <img src="/assets/icons/add_contact.svg" alt="V-Card Icon" />
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
              <img src="/assets/icons/icons-qr-code.svg" alt="QR Icon" />
            </button>
          </div>
        </div>
      </div>
      {parentSwiper?.activeIndex !==
        parseInt(parentSwiper?.slides?.length) - 1 && (
        <div
          className={Styles.media__content__bottomSheet}
          onClick={() => {
            parentSwiper.slideNext();
          }}
        >
          <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
        </div>
      )}
    </div>
  );
};

export default React.memo(SliderContent);
// export default SliderContent;

/* 
// 
else if (cta1.link_url.startsWith("/api/")) {
                                console.log(cta1.link_url);

                                const link = document.createElement("a");
                                link.href = cta1?.link_url;
                                // Append to html link element page
                                document.body.appendChild(link);
                                // Start download
                                link.click();
                                // Clean up and remove the link
                                link.parentNode.removeChild(link);
                              } 

*/
