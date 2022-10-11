import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperProps, SwiperSlide, useSwiper, } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import dynamic from "next/dynamic";
import Links from "./Links/Links";
// import VLinks from "../VLinks/VLinks/VLinks";
// import Events from "../Events/Events";
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
// import Test2 from '../Test/Test2';
export let gmenu = [];
export let sp = null;

// const HeroSlider = dynamic(() => import("./Sliders/HeroSlider/HeroSlider"));

const Sections: React.FC<{ vreel: any; user?: any }> = ({ vreel, user }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { username, section, employee } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const path = useRef(router.asPath);
  const { muteAudio, startAudio, setAudioSrc, isInitialized } = useAudio({ audioType: "icecast" });
  const [slides, setSlides] = useState([]);
  // const [sections, setSections] = useState([]);
  const { fonts, setFonts } = useFonts([]);
  const [mute, setMute] = useState<boolean>(true);
  const [slidesState, setSlidesState] = useState({});
  const { activeSectionId } = useSelector((state: RootState) => state.presentation);
  const [queryFields, setQueryFields] = useState({ section: router.query.section || "", slide: router.query.slide || "" })
  const dispatch = useDispatch();
  let sectionMap = {}
  const name = `${user?.prefix ? user?.prefix + " " : ""}${user?.first_name ? user?.first_name + " " : ""
    }${user?.middle_initial ? user?.middle_initial + " " : ""}${user?.last_name ? user?.last_name + " " : ""
    }${user?.suffix ? user?.suffix + " " : ""}`;

  const sections: any[] = useMemo(() => {
    const { socials, simple_links, slides: inititalSlide, gallery: galleries, embed } = vreel;

    const slides = employee
      ? [employeeSlide, ...inititalSlide.filter((e) => e.active)]
      : [...inititalSlide.filter((e) => e.active)];
    const sections: any = [{ slides, type: "slides" }]
    embed.forEach((embed) => {
      sections[embed.position] = {
        type: "embed",
        ...embed
      }
    })
    socials.forEach((social) => {

      sections[social.position] = {
        type: "socials",
        ...social
      }
    });

    simple_links.forEach((link) => {
      sections[link.position] = {
        type: "simple_links",
        ...link
      }
    });

    galleries.forEach((_gallery) => {
      const filteredSlides = _gallery.slides?.filter((slide) => {
        if (isMobile && slide.mobile.uri != "") return true;
        if (!isMobile && slide.desktop.uri != "") return true;
      })
      let gallery = { ..._gallery, slide: filteredSlides };

      gallery.slides = filteredSlides;
      if (gallery.slides.length > 0) {
        sections[gallery.position] = {
          type: "gallery",
          ...gallery
        }
      }
    });

    return sections
  }, [vreel, isMobile])


  useEffect(() => {
    if (vreel) {
      const backgroundAudioSrc = vreel.display_options.background_audio;
      setAudioSrc(backgroundAudioSrc);
      if (backgroundAudioSrc && isInitialized) {
        startAudio();
      }
    }
  }, [isInitialized])

  function handleViewResize() {
    setIsMobile(window.innerWidth <= 500);
  }
  useEffect(() => {
    window.addEventListener("resize", handleViewResize)
    return () => {
      window.removeEventListener("resize", handleViewResize);
    }
  }, [])

  useEffect(() => {

    const fonts = [];
    const options = vreel?.display_options;
    if (!options) return
    if (options.slide?.title?.uri) {
      fonts.push({
        uri: options?.slide?.title?.uri,
        fontFace: options?.slide?.title?.family
      })
    }
    if (options.slide?.description?.uri) {
      fonts.push({
        uri: options?.slide?.description?.uri,
        fontFace: options?.slide?.description?.family
      })
    }
    if (options.slide?.button?.uri) {
      fonts.push({
        uri: options?.slide?.button?.uri,
        fontFace: options?.slide?.button?.family
      })
    }

    if (options?.sections?.title?.uri) {
      fonts.push({
        uri: options?.sections?.title?.uri,
        fontFace: options?.sections?.title?.family
      })
    }
    if (options.sections?.description?.uri) {
      fonts.push({
        uri: options?.sections?.description?.uri,
        fontFace: options?.sections?.description?.family
      })
    }
    if (options.slide?.button?.uri) {
      fonts.push({
        uri: options?.sections?.button?.uri,
        fontFace: options?.sections?.button?.family
      })
    }
    console.log("options", options)

    fonts.push({
      uri: options?.sections?.header?.uri || "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      fontFace: "headerFont"
    })


    setFonts(fonts)


  }, [])

  useEffect(() => {
    if (activeSectionId === "slide") {

      swiper?.slideTo(0)
      return
    }
    const index = sectionMap[activeSectionId]
    if (index) swiper?.slideTo(index)
  }, [activeSectionId])

  function setActiveSessionId() {

  }


  const employeeSlide = employee
    ? {
      id: user.id,
      slide_location: 0,
      logo_visible: true,
      logo_uri: vreel.display_options?.default_logo,
      content_type: "",
      uri: "",
      title: {
        header: name,
        description: user?.job_title,
      },
      advanced: {
        header:
          "We make you look better! Our Web3 interface curates and displays your story amazingly.",
      },
      mobile: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: "",
        uri: user.selfPortraitImage,
        content_type: "image",
      },
      desktop: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: "",
        uri: user.selfLandscapeImage,
        content_type: "image",
      },
      cta1: {
        isEmployee: true,
        link_header: "Add Contact",
        link_type: "",
        link_url: `/api/vcard?username=${username}&employee=${employee}`,
      },
      cta2: {
        link_header: "Linkedin",
        link_type: "",
        link_url: user.linkedinUrl,
      },
      cta3: {
        link_header: "Share <br/>Contact",
        link_type: "",
        link_url: "#",
      },
    }
    : {};

  // useEffect(() => {
  //   if (!vreel) return;

  //   setSlides(slides);
  //   setSections(sections);
  // }, [vreel]);

  useEffect(() => {
    router.push({
      pathname: router.asPath.split("?")[0],
      query: { section: queryFields.section, slide: queryFields.slide }
    })
  }, [queryFields])

  // sections.sort((a: any, b: any) => {
  //   return a[0] == "slides" ? 0 : a[1].position - b[1].position;
  // });

  useEffect(() => {
    if (mute) {
      muteAudio()
    }
  }, [mute])

  const [initialSlide, setinitialSlide] = useState(
    section ? sections.map((e: any) => e[0]).indexOf(section) : 0
  );

  useEffect(() => {
    setinitialSlide(sections.map((e: any) => e[0]).indexOf(section));
    // if (swiper) swiper.slideTo(0);
    // console.log({ section, info: "section changes..." });
  }, [section]);

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(sectionMap[queryFields.section as string])
  }, [swiper])

  gmenu = sections.map((e) => ({ header: e.header, id: e.id }));

  if (sections.length > 0) {
    const map = sections.reduce((prev, curr, idx) => ({ ...prev, [curr.id]: idx }));
    sectionMap = map;
  }
  const contentSections = sections.map((sec: any, index: number) => {
    vreel.display_options?.sections
    const galleryDisplayOptions = {
      title: vreel.display_options?.sections?.title,
      description: vreel.display_options?.sections?.description,
      button: vreel.display_options?.sections?.button
    }
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
                  muteAudio={muteAudio}
                  playAudio={startAudio}
                  displayOptions={vreel.display_options?.slide}
                  default_logo={vreel.display_options.default_logo}
                  mute={mute}
                  setMute={setMute}
                  setSlidesState={setSlidesState}
                  slidesState={slidesState}
                  updateSlide={(s) => setQueryFields(prev => ({ ...prev, slide: s }))}
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
              <Links displayOptions={vreel.display_options?.sections} header={sec.header} links={sec?.links} parentSwiper={swiper} />
            </MainContainer>
          </SwiperSlide>
        );
      case "socials":
        if (sec?.socials.length == 0) return null;
        return (
          <SwiperSlide key={index}>
            <MainContainer backgroundColor={sec.background_color}>
              <section id={sec.id}>
                <Socials displayOptions={vreel.display_options?.sections} header={sec.header} socials={sec?.socials} parentSwiper={swiper} />
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
                muteAudio={muteAudio}
                playAudio={startAudio}
                displayOptions={galleryDisplayOptions}
                mute={mute}
                setMute={setMute}
                setSlidesState={setSlidesState}
                slidesState={slidesState}
                updateSlide={(s) => setQueryFields(prev => ({ ...prev, slide: s }))}
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
          startAudio();
          let activeSectionId;

          setCurrentSlide(s.realIndex);
          if (s.activeIndex === 0) {
            setQueryFields(prev => ({ ...prev, section: null }))
            return
          }
          for (const [key, val] of Object.entries(sectionMap)) {
            if (val === s.activeIndex) {
              activeSectionId = key;
              if (activeSectionId) {
                setQueryFields(prev => ({ ...prev, section: activeSectionId }))
                return;
              }
              return
            }
          }
        }}
        onSwiper={(swiper) => {
          sp = swiper;
          setSwiper(swiper);
        }}
      >
        {contentSections.map((Element, idx) => (<div key={idx}> {Element} </div>))}
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
