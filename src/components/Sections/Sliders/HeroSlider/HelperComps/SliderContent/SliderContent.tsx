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
import clsx from "clsx";
import { QrCode } from "@sections/Sliders/HeroSlider/HelperComps/QR";
import CallToActionButton from "./cta";
import UserProfile from "@shared/UserProfile/UserProfile";

const MediaUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL


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
    const { metadata: { employee, username }, current } = useSelector((state: RootState) => state.vreel)


    const vreel = useSelector((state: any) => state?.vreel?.vreel);
    const [qrcodeUri, setQrcodeUri] = useState("");
    const userAuthenticated = useSelector(
      (state: RootState) => state.userAuth.userAuthenticated
    );

    const { titleFontName, descriptionFontName, buttonFontName } = displayOptions;
    const base = `${process.env.NEXT_PUBLIC_SITE_BASE_URL}${router.asPath.split("?")[0]}`;
    //const [ctaButtonPosition, setCtaButtonPosition] = useState("center"); // It could be center OR side
    const [ctaButtonPosition, setCtaButtonPosition] = useState("side"); // It could be center OR side

    const {
      title,
      logo_visible,
      id,
      qrcode_visible,
      contact_visible,
      share_visible,
      cta1,
      cta2,
      cta3,
      cta4,
      company_name,
      job_description,
      profilePicture,
      profile_picture,
      is_employee,
      advanced: { logoUrl, isDarkMode },
      desktop,
      muted: slideMute,
      mobile,
    } = slide;

    useEffect(() => {
      setQrcodeUri(`${base}?section=${current.section}&slide=${current.slide}`)

    }, [current])

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
              style={{ width: "100%", position: "absolute", top: "-10px" }}
              className={Styles.media__content_wrapper__vreelLogo}
            >
              <img
                style={{ maxWidth: "85%", maxHeight: "100px" }}
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
              {((!isImage && !slideMute) || hasBackgroundAudio) && (
                <button
                  onClick={() => {
                    setMute(!mute);
                    // if (!playing) {
                    //   setPlaying(true);
                    // }
                  }}
                  style={
                    {
                      "marginTop": `1rem`
                    }
                  }
                  className={mute ? Styles.media__content_wrapper__left__bottom__muteBtn : Styles.media__content_wrapper__left__bottom__unMuteBtn}
                >
                  {/*<img*/}
                  {/*  src={`/assets/${*/}
                  {/*    mute ? "icons/audioOff.svg" : "icons/audioOn.svg"*/}
                  {/*  }`}*/}
                  {/*  alt="Mute Icon"*/}
                  {/*/>*/}
                  <a>{mute ? "Tap to Unmute" : "Mute"}</a>
                </button>
              )}
              {isImage && (
                <div
                  className={Styles.media__content_wrapper__left__bottom__muteBtn}
                ></div>
              )}
              {cookies.userAuthToken && userAuthenticated && (
                <div className={Styles.media__content_wrapper__left__bottom__userProfile}>
                  <UserProfile />
                </div>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div
            className={Styles.media__content_wrapper__middle}
            style={
              {
                "--marginBottom": `${parentSwiper?.activeIndex !==
                  parseInt(parentSwiper?.slides?.length) - 1
                  ? 1.8
                  : 1.8
                  }rem`,
              } as CSSProperties
            }
          >


            <div className={Styles.media__content_wrapper__middle__container}>
              {(is_employee && profilePicture !== "" && profile_picture) &&
                <div className={Styles.profile_image}>
                  <img style={{ maxWidth: "200px", maxHeight: "200px" }} alt="profile image" src={profile_picture} />
                </div>
              }
              <h3 style={{ fontFamily: titleFontName }}>{title?.header}</h3>

              <p style={{ fontFamily: descriptionFontName }}>
                {title?.description}
              </p>
              {/* META TEXT */}

              {company_name != "" &&
                <p>{company_name}</p>
              }
              {job_description != "" &&
                <p>{job_description}</p>
              }


                {/* CALL TO ACTIONS */}
                {ctaButtonPosition === "center" &&
                    <div className={Styles.button_container_group}>
                        {
                            cta1?.link_header !== "" &&

                            <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta1}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                            />

                        }
                        {
                            (cta2 && cta2?.link_header !== "") &&

                            <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta2}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                            />

                        }
                        {
                            (cta3 && cta3?.link_header !== "") &&

                            <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta3}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                            />

                        }
                        {
                            (cta4 && cta4?.link_header !== "") &&

                            <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta4}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                            />

                        }
                    </div>
                }
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className={Styles.media__content_wrapper__right}>
            <div className={Styles.media__content_wrapper__right__topContainer}>
              <button onClick={() => dispatch(expandMenu())}>
                <img src="/assets/icons/menu.svg" alt="Menu Icons" />
              </button>
            </div>
            <div>
                {/* CALL TO ACTIONS */}
                    {(ctaButtonPosition !== "center" && cta1?.link_header !== "") &&
                        <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta1}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                        />

                    }
                    {
                        (ctaButtonPosition !== "center" && cta2 && cta2?.link_header !== "") &&

                        <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta2}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                        />

                    }
                    {
                        (ctaButtonPosition !== "center" && cta3 && cta3?.link_header !== "") &&

                        <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta3}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                        />

                    }
                    {
                        (ctaButtonPosition !== "center" && cta4 && cta4?.link_header !== "") &&

                        <CallToActionButton
                            buttonFontName={buttonFontName}
                            cta={cta4}
                            navigateToSection={navigateToSection}
                            navigateToSlide={navigateToSlide}
                        />

                    }

              {contact_visible &&
                <button className={Styles.contact}
                  onClick={async () => {
                    // const res = await fetch("/api/vcard").then((res) =>
                    //   res.json()
                    // );
                    // console.log({ res });
                  }}
                >
                  {/* &&interprise=&&employeeid= */}
                  <a
                    href={`/api/vcard?id=${employee}`}
                  >
                    {/*<img src="/assets/icons/add_contact.svg" alt="V-Card Icon" />*/}
                    Contact
                  </a>
                </button>
              }
              {
                  share_visible  &&
                <button className={Styles.share}
                  onClick={() => {
                    dispatch(expandShare());
                    // setAutoPlay(false);
                  }}
                >
                  {/*<img src="/assets/icons/share-plan.svg" alt="Share Icon" />*/}
                  <a>Share</a>
                </button>
              }
              {qrcode_visible  &&
                <button onClick={() => dispatch(expandQR())} className={Styles.qr_code}>
                  {/*<img src="/assets/icons/icons-qr-code.svg" alt="QR Icon" />*/}
                  <QrCode url={qrcodeUri} />
                </button>
              }
            </div>
          </div>
        </div>
        {(parentSwiper?.activeIndex !==
          parseInt(parentSwiper?.slides?.length) && parseInt(parentSwiper?.slides?.length) > 1) && (
            <div
              className={clsx(
                Styles.media__content__bottomSheet,
                parentSwiper?.activeIndex < parseInt(parentSwiper?.slides?.length) - 1 &&
                Styles.media__content__bottomSheet__down
              )}
              onClick={() => parentSwiper?.activeIndex < parseInt(parentSwiper?.slides?.length) - 1 ? parentSwiper.slideNext() : parentSwiper.slideTo(0)}
            >
              <div className={Styles.arrow_container}>
                {/*<div className={Styles.arrow_down}></div>*/}
                <img src="/assets/icons/carrot-down.png" alt="Carrot Down images" />
              </div>
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
