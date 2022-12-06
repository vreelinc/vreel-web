import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dynamic from "next/dynamic";
import Links from "./Links/Links";
import Socials from "./Socials/Socials";
import Contribute from "./Contribute/Contribute";
import MusicLinks from "./MusicLinks/MusicLinks";
import GallerySlider from "./Sliders/GallerySlider/GallerySlider";
import { useRouter } from "next/router";
import { Loader } from "@shared/Loader/Loader";
import MainContainer from "./MainContainer/MainContainer";
import HeroSlider from "./Sliders/HeroSlider/HeroSlider";
import CustomHead from "@shared/meta/MetaTags";
import EmbedSection from "./Embed";
import SectionContainer from "./SectionContainer/SectionContainer";
import useAudio from "@hooks/useAudio";
import useFonts from "@hooks/useFonts";
import { useDispatch } from "react-redux";
import { setActiveSection } from "@redux/createSlice/presentation";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { type } from "os";
import { setCurrent } from "@redux/createSlice/vreelSlice";
// import Test2 from '../Test/Test2';
export let gmenu = [];
export let sp = null;

// const HeroSlider = dynamic(() => import("./Sliders/HeroSlider/HeroSlider"));

const Sections: React.FC<{ vreel: any; user?: any, enterprise?: any }> = ({ vreel, user, enterprise }) => {

  console.log("@Employee Metadata", user?.employee_metadata)
  /**
   * EMPLOYEE SLIDE DATA ^^
   * Reference The employeeSlide variable to pass data down to the Slide Content level (Where the employee is rendered)
   */
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const { username, section, employee } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const path = useRef(router.asPath);
  // const {} = vreel?.display_options;
  const audioType = vreel?.display_options?.audio_type;
  const backgroundAudioUrl = vreel?.display_options?.background_audio;

  const audioElement = useMemo(() => {
    if (audioType === "mp3") return new Audio(backgroundAudioUrl);
    if (audioType === "icecast") return new Audio();
  }, []);

  const {
    muteAudio: muteBackgroundAudio,
    startAudio: startBackgroundAudio,
    setAudioSrc,
    isInitialized,
  } = useAudio({
    audioType: audioType,
    audioElement,
  });

  console.log(enterprise)

  const [slides, setSlides] = useState([]);
  // const [sections, setSections] = useState([]);
  const { fonts, setFonts } = useFonts([]);
  const [mute, setMute] = useState<boolean>(true);
  const [slidesState, setSlidesState] = useState({});
  const { activeSectionId } = useSelector(
    (state: RootState) => state.presentation
  );
  const [queryFields, setQueryFields] = useState({
    section: router.query.section || "",
    slide: router.query.slide || "",
  });
  const dispatch = useDispatch();
  let sectionMap = {};
  const name = `${user?.prefix ? user?.prefix + " " : ""}${user?.first_name ? user?.first_name + " " : ""
    }${user?.middle_initial ? user?.middle_initial + " " : ""}${user?.last_name ? user?.last_name + " " : ""
    }${user?.suffix ? user?.suffix + " " : ""}`;
  const employeeSlide = employee
    ? {
      id: user.id,
      slide_location: 0,
      logo_visible: true,
      logo_uri: vreel.display_options?.default_logo,
      content_type: "",
      contact_visible: true,
      share_visible: true,
      qrcode_visible: true,
      uri: "",
      title: {
        header: name,
        description: user?.job_title,
      },
      advanced: {
        background_audio_url: "",
        header:
          "We make you look better! Our Web3 interface curates and displays your story amazingly.",
      },
      mobile: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: "",
        uri: user.selfPortraitImage !== "" ? user.selfPortraitImage : enterprise?.default_portrait,
        content_type: "image",
      },
      desktop: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: "",
        uri: user.selfLandscape !== "" ? user.selfLandscapeImage : enterprise?.default_landscape,
        content_type: "image",
      },

      cta1: user?.employee_metadata?.cta1,
      cta2: user?.employee_metadata?.cta2,
      cta3: user?.employee_metadata?.cta3,
      cta4: user?.employee_metadata?.cta4,
      profile_picture: user?.employee_metadata?.display_profile_image ? user?.profilePicture : "",
      is_employee: true,
      job_description: user?.employee_metadata?.job_description,
      company_name: enterprise.companyName
    }
    : {};
  const sections: any[] = useMemo(() => {
    console.log("VREEL", vreel)
    const {
      socials,
      simple_links,
      slides: inititalSlide,
      gallery: galleries,
      embed,
      members
    } = vreel;

    const slides = employee
      ? [employeeSlide, ...inititalSlide.filter((e) => e.active)]
      : [...inititalSlide.filter((e) => e.active)];
    const sections: any = [{ slides, type: "slides" }];
    embed.forEach((embed) => {
      sections[embed.position] = {
        type: "embed",
        ...embed,
      };
    }); ''
    socials.forEach((social) => {
      sections[social.position] = {
        type: "socials",
        ...social,
      };
    });


    simple_links.forEach((link) => {

      sections[link.position] = {
        type: "simple_links",
        ...link,
      };
    });

    [...galleries, ...members].forEach((_gallery) => {
      const filteredSlides = _gallery.slides?.filter((slide) => {
        if (isMobile && slide.mobile.uri != "") return true;
        if (!isMobile && slide.desktop.uri != "") return true;
      });
      let gallery = { ..._gallery, slide: filteredSlides };

      gallery.slides = filteredSlides;
      if (gallery.slides.length > 0) {
        sections[gallery.position] = {
          type: "gallery",
          ...gallery,
        };
      }
    });

    return sections;
  }, [vreel, isMobile]);

  // useEffect(() => {
  //   if (vreel) {
  //     const backgroundAudioSrc = vreel.display_options.background_audio;
  //     setAudioSrc(backgroundAudioSrc);
  //     if (backgroundAudioSrc && isInitialized) {
  //       startAudio();
  //     }
  //   }
  // }, [isInitialized]);

  function handleViewResize() {
    setIsMobile(window.innerWidth < 500);
  }
  useEffect(() => {
    window.addEventListener("resize", handleViewResize);
    return () => {
      window.removeEventListener("resize", handleViewResize);
    };
  }, []);

  useEffect(() => {
    const fonts = [];
    const options = vreel?.display_options;
    if (!options) return;
    if (options.slide?.title?.uri) {
      fonts.push({
        uri: options?.slide?.title?.uri,
        fontFace: options?.slide?.title?.family,
      });
    }
    if (options.slide?.description?.uri) {
      fonts.push({
        uri: options?.slide?.description?.uri,
        fontFace: options?.slide?.description?.family,
      });
    }
    if (options.slide?.button?.uri) {
      fonts.push({
        uri: options?.slide?.button?.uri,
        fontFace: options?.slide?.button?.family,
      });
    }

    if (options?.sections?.title?.uri) {
      fonts.push({
        uri: options?.sections?.title?.uri,
        fontFace: options?.sections?.title?.family,
      });
    }
    if (options.sections?.description?.uri) {
      fonts.push({
        uri: options?.sections?.description?.uri,
        fontFace: options?.sections?.description?.family,
      });
    }
    if (options.slide?.button?.uri) {
      fonts.push({
        uri: options?.sections?.button?.uri,
        fontFace: options?.sections?.button?.family,
      });
    }
    console.log("options", options);

    fonts.push({
      uri:
        options?.sections?.header?.uri ||
        "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      fontFace: "headerFont",
    });

    setFonts(fonts);
  }, []);

  useEffect(() => {
    if (!activeSectionId) return;
    if (activeSectionId?.toString().toLocaleLowerCase() === "slides") {
      swiper?.slideTo(0);
      return;
    }
    const index = sectionMap[activeSectionId];
    if (index) swiper?.slideTo(index);
  }, [activeSectionId]);

  useEffect(() => {
    dispatch(setCurrent(queryFields))
    // router.push({
    //   pathname: router.asPath.split("?")[0],
    //   query: { section: queryFields.section, slide: queryFields.slide },
    // });
  }, [queryFields]);

  useEffect(() => {
    if (mute) {
      muteBackgroundAudio();
    }
  }, [mute]);

  const [initialSlide, setinitialSlide] = useState(
    section ? sections.map((e: any) => e[0]).indexOf(section) : 0
  );

  useEffect(() => {
    setinitialSlide(sections.map((e: any) => e[0]).indexOf(section));
  }, [section]);

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(sectionMap[queryFields.section as string]);
  }, [swiper]);

  gmenu = [
    { header: "slides", id: "slides" },
    ...sections.map((e) => ({ header: e.header, id: e.id })),
  ];

  if (sections.length > 0) {
    const map = sections.reduce((prev, curr, idx) => ({
      ...prev,
      [curr.id]: idx,
    }));
    sectionMap = map;
  }
  const contentSections = sections.map((sec: any, index: number) => {
    vreel.display_options?.sections;
    const galleryDisplayOptions = {
      title: vreel.display_options?.sections?.title,
      description: vreel.display_options?.sections?.description,
      button: vreel.display_options?.sections?.button,
      backgroundAudio: vreel.display_options?.background_audio
    };
    switch (sec.type) {
      case "slides":
        return (
          <SwiperSlide key={index}>
            {index == currentSlide && (
              <MainContainer>
                <HeroSlider
                  idx={index}
                  active={activeIndex === index}
                  isSection={false}
                  slides={sec.slides}
                  view="Mobile"
                  parentSwiper={swiper}
                  sectionMap={sectionMap}
                  muteAudio={muteBackgroundAudio}
                  playAudio={startBackgroundAudio}
                  displayOptions={vreel.display_options?.slide}
                  default_logo={vreel.display_options.default_logo}
                  mute={mute}
                  setMute={setMute}
                  setSlidesState={setSlidesState}
                  slidesState={slidesState}
                  updateSlide={(s) =>
                    setQueryFields((prev) => ({ ...prev, slide: s }))
                  }
                />
              </MainContainer>
            )}
            {/* <Suspense fallback={<Loader />}>
              <Test2 />
            </Suspense> */}
          </SwiperSlide>
        );
      case "simple_links":
        if (sec?.links?.length == 0) return null;
        return (
          <SwiperSlide key={index}>
            <MainContainer backgroundColor={sec.background_color}>
              <Links
                displayOptions={vreel.display_options?.sections}
                header={sec.header}
                links={sec?.links}
                parentSwiper={swiper}
              />
            </MainContainer>
          </SwiperSlide>
        );
      case "socials":
        if (sec?.socials.length == 0) return null;
        return (
          <SwiperSlide key={index}>
            <MainContainer backgroundColor={sec.background_color}>
              <section id={sec.id}>
                <Socials
                  displayOptions={vreel.display_options?.sections}
                  header={sec.header}
                  socials={sec?.socials}
                  parentSwiper={swiper}
                />
              </section>
            </MainContainer>
          </SwiperSlide>
        );
      case "gallery":
        return (
          <SwiperSlide key={index}>
            <MainContainer>
              <HeroSlider
                idx={index}
                slides={sec.slides}
                view="Mobile"
                headerText={sec.header}
                active={activeIndex === index}
                parentSwiper={swiper}
                sectionMap={sectionMap}
                isSection
                muteAudio={muteBackgroundAudio}
                playAudio={startBackgroundAudio}
                displayOptions={galleryDisplayOptions}
                mute={mute}
                setMute={setMute}
                setSlidesState={setSlidesState}
                slidesState={slidesState}
                updateSlide={(s) =>
                  setQueryFields((prev) => ({ ...prev, slide: s }))
                }
              />
            </MainContainer>

            {/* <Suspense fallback={<Loader />}>
              <Test2 />
            </Suspense> */}
          </SwiperSlide>
        );
      case "videos":
        if (sec[1].videos.length == 0) return null;
        return (
          <SwiperSlide key={index}>
            <MainContainer>
              <GallerySlider
                title="Video Gallery"
                items={sec[1].videos}
                parentSwiper={swiper}
                isVisiable={index == currentSlide}
              />
            </MainContainer>
          </SwiperSlide>
        );
      case "embed":
        return (
          <SwiperSlide key={index}>
            <MainContainer>
              <EmbedSection embed={sec} />
            </MainContainer>
          </SwiperSlide>
        );

      default:
        return null;
    }
  });

  return (
    <div id="vreel-content">
      <CustomHead title={`${username ? username : "VReel"}'s VReel`} />
      <Swiper
        modules={[Pagination, Autoplay, Mousewheel, Navigation]}
        slidesPerView={1}
        mousewheel={true}
        lazy={true}
        speed={300}
        direction={"vertical"}
        style={{ height: "100vh" }}
        initialSlide={initialSlide}
        onSlideChange={(s) => {
          setActiveIndex(s.activeIndex);

          let activeSectionId;

          setCurrentSlide(s.realIndex);
          if (s.activeIndex === 0) {
            setQueryFields((prev) => ({ ...prev, section: null }));
            return;
          }
          for (const [key, val] of Object.entries(sectionMap)) {
            if (val === s.activeIndex) {
              activeSectionId = key;
              if (activeSectionId) {
                setQueryFields((prev) => ({
                  ...prev,
                  section: activeSectionId,
                }));
                return;
              }
              return;
            }
          }
        }}
        onSwiper={(swiper) => {
          sp = swiper;
          setSwiper(swiper);
        }}
      >
        {contentSections.map((Element, idx) => (
          <div key={idx}> {Element} </div>
        ))}
        {/* <SwiperSlide>
        <VreelSlider
          vreel={data.username.vreel}
          view="Mobile"
          parentSwiper={swiper}
        />
      </SwiperSlide> */}
        {/*  {elements.simple_links && (
        <SwiperSlide>
          <Links links={elements.simple_links.links} parentSwiper={swiper} />
        </SwiperSlide>
      )} */}
        {/*   <SwiperSlide>
        <VLinks parentSwiper={swiper} />
      </SwiperSlide> */}
        {/* <SwiperSlide>
        <Events parentSwiper={swiper} />
      </SwiperSlide> */}
        {/* some test for test */}
        {/*  {elements.socials && (
        <SwiperSlide>
          <Socials socials={elements.socials.socials} parentSwiper={swiper} />
        </SwiperSlide>
      )} */}
        {/* <SwiperSlide>
        <Contribute parentSwiper={swiper} />
      </SwiperSlide> */}
        {/*  <SwiperSlide>
        <MusicLinks parentSwiper={swiper} />
      </SwiperSlide> */}

        {/* {elements?.gallery?.images.length && (
        <SwiperSlide>
          <CommonSliders
            title="Image Gallery"
            items={elements?.gallery?.images}
            parentSwiper={swiper}
          />
        </SwiperSlide>
      )} */}
        {/* {elements?.videos?.videos.length && (
        <SwiperSlide>
          <CommonSliders
            title="Video Gallery"
            items={elements?.videos?.videos}
            parentSwiper={swiper}
          />
        </SwiperSlide>
      )} */}
      </Swiper>
    </div>
  );
};

export default Sections;

/* 

https://staging.vreel.page/[enterpriseName]/e/[employeeId]
From Aaron Marsh to Everyone 09:39 PM
enterprise(id: "cafb0p223akj9g4qk1ag")
^avangard enterprise id


*/
