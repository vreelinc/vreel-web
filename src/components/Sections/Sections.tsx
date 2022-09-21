import React, { lazy, Suspense, useEffect, useState } from "react";
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
// import Test2 from '../Test/Test2';
export let gmenu = [];
export let sp = null;

// const HeroSlider = dynamic(() => import("./Sliders/HeroSlider/HeroSlider"));

const Sections: React.FC<{ vreel: any; user?: any }> = ({ vreel, user }) => {
  console.log("vreel object", vreel)
  const router = useRouter();
  const { username, section, employee } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { muteAudio, startAudio, setAudioSrc, isInitialized } = useAudio({ audioType: "icecast" })
  const name = `${user?.prefix ? user?.prefix + " " : ""}${user?.first_name ? user?.first_name + " " : ""
    }${user?.middle_initial ? user?.middle_initial + " " : ""}${user?.last_name ? user?.last_name + " " : ""
    }${user?.suffix ? user?.suffix + " " : ""}`;

  useEffect(() => {
    console.log("vreel object", vreel)
  }, [])

  useEffect(() => {
    const backgroundAudioSrc = vreel.display_options.background_audio;
    setAudioSrc(backgroundAudioSrc);
    if (backgroundAudioSrc && isInitialized) {
      startAudio();
    }
  }, [isInitialized])

  const employeeSlide = employee
    ? {
      id: user.id,
      slide_location: 0,
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

  galleries.forEach((gallery) => {
    if (gallery.slides.length > 0) {
      sections[gallery.position] = {
        type: "gallery",
        ...gallery
      }
    }
  })
  // sections.sort((a: any, b: any) => {
  //   return a[0] == "slides" ? 0 : a[1].position - b[1].position;
  // });
  const [initialSlide, setinitialSlide] = useState(
    section ? sections.map((e: any) => e[0]).indexOf(section) : 0
  );

  useEffect(() => {
    setinitialSlide(sections.map((e: any) => e[0]).indexOf(section));
    // if (swiper) swiper.slideTo(0);
    // console.log({ section, info: "section changes..." });
  }, [section]);

  gmenu = sections.map((e) => e[0]);
  const sectionIdMap = sections.reduce((prev, curr, idx) => ({ ...prev, [curr.id]: idx }))
  const contentSections = sections.map((sec: any, index: number) => {
    // console.log({ sec, 0: sec[0], 1: sec[1] });

    switch (sec.type) {
      case "slides":
        console.log("display slides", sec)
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
                  sectionMap={sectionIdMap}
                  muteAudio={muteAudio}
                  playAudio={startAudio}
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
            <MainContainer>
              <Links header={sec.header} links={sec?.links} parentSwiper={swiper} />
            </MainContainer>
          </SwiperSlide>
        );
      case "socials":
        if (sec?.socials.length == 0) return null;
        return (
          <SwiperSlide key={index}>
            <MainContainer>
              <section id={sec.id}>
                <Socials header={sec.header} socials={sec?.socials} parentSwiper={swiper} />
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
                sectionMap={sectionIdMap}
                isSection
                muteAudio={muteAudio}
                playAudio={startAudio}
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
  console.log({ contentSections });

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
          if (username && employee)
            // `/${username}/e/${employee}?slide=${slides?.map((e) => e.id)[0]}`
            router.push(
              `/${username}/e/${employee}?section=${sections[s.realIndex][0]}`
            );
          else if (username) { }
          // router.push(`/${username}?section=${sections[s.realIndex][0]}`);
          else {
            router.push(`/?section=${sections[s.realIndex][0]}`);
          }
          setCurrentSlide(s.realIndex);
        }}
        onSwiper={(swiper) => {
          sp = swiper;
          // console.log(sp, "sp stored.......");

          setSwiper(swiper);
        }}
      >
        {contentSections.filter((e) => e)}
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
