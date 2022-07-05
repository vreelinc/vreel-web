import React, { lazy, Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
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
// import Test2 from '../Test/Test2';
export let gmenu = [];
export let sp = null;

// const HeroSlider = dynamic(() => import("./Sliders/HeroSlider/HeroSlider"));

const Sections: React.FC<{ vreel: any; user?: any }> = ({ vreel, user }) => {
  const router = useRouter();
  const { username, section, employee } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // console.log(data);
  /*  const user = {
    id: "cafbvma23akm6314a11g",
    title: "",
    profilePicture:
      "https://staging.vreel.page/files/3d0ed2d046e41b77e39aeaa97f30530e",
    first_name: "Adrian",
    last_name: "Collins",
    email: "acollins@avaicg.com",
    selfPortraitImage:
      "https://staging.vreel.page/files/84d623fb1867289a6a2d79a3adbbca41",
    selfLandscapeImage:
      "https://staging.vreel.page/files/029e442f9beb675d48ee4e6806c18a7f",
    account_type: "employee",
    companyName: "Avangard Innovative",
    username: "cafbvlq23akm6314a110",
    middle_initial: "",
    prefix: "",
    suffix: "",
    home_phone: "",
    cell_phone: "713-865-3802",
    work_phone: "",
    business_address: "920 Memorial City Way, Suite 715, Houston, TX 77024",
    home_address: "",
    website: "https://www.avaicg.com",
    landing_page: "",
    job_title: "Senior Vice President of Development",
    vreel: {
      author: "cafbvma23akm6314a11g",
    },
  }; */
  const name = `${user?.prefix ? user?.prefix + " " : ""}${
    user?.first_name ? user?.first_name + " " : ""
  }${user?.middle_initial ? user?.middle_initial + " " : ""}${
    user?.last_name ? user?.last_name + " " : ""
  }${user?.suffix ? user?.suffix + " " : ""}`;
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
          link_header: "Add Contact",
          link_type: "",
          link_url: `/api/vcard?username=${username}&employee=${employee}`,
        },
        cta2: {
          link_header: "Send Contact",
          link_type: "",
          link_url: "#",
        },
      }
    : {};

  const { elements, slides: inititalSlide } = vreel;
  const slides = employee
    ? [employeeSlide, ...inititalSlide]
    : [...inititalSlide];
  const sections = Object.entries({ slides, ...elements }).filter(
    (e) => e[1] != null && e[0] != "__typename"
  );

  console.log({ sections });

  // console.log({ elements, slides });
  // console.log(
  //   Object.entries({ slides, ...elements }).filter(
  //     (e) => e[1] != null && e[0] != "__typename"
  //   )
  // );
  // console.log("unsorted", { elements }, { sections });
  sections.sort((a: any, b: any) => {
    return a[0] == "slides" ? 0 : a[1].position - b[1].position;
  });
  const [initialSlide, setinitialSlide] = useState(
    section ? sections.map((e: any) => e[0]).indexOf(section) : 0
  );
  // console.log("sorted", { sections });
  useEffect(() => {
    setinitialSlide(sections.map((e: any) => e[0]).indexOf(section));
    // if (swiper) swiper.slideTo(0);
    // console.log({ section, info: "section changes..." });
  }, [section]);

  gmenu = sections.map((e) => e[0]);

  return (
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
        if (username && employee)
          // `/${username}/e/${employee}?slide=${slides?.map((e) => e.id)[0]}`
          router.push(
            `/${username}/e/${employee}?section=${sections[s.realIndex][0]}`
          );
        else if (username)
          router.push(`/${username}?section=${sections[s.realIndex][0]}`);
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
      {sections.map((sec: any, index: number) => {
        // console.log({ sec, 0: sec[0], 1: sec[1] });

        switch (sec[0]) {
          case "slides":
            return (
              <SwiperSlide key={index}>
                {index == currentSlide && (
                  <MainContainer>
                    <HeroSlider
                      slides={sec[1]}
                      view="Mobile"
                      parentSwiper={swiper}
                    />
                  </MainContainer>
                )}
                {/* <Suspense fallback={<Loader />}>
                    <Test2 />
                  </Suspense> */}
              </SwiperSlide>
            );
          case "simple_links":
            return (
              <SwiperSlide key={index}>
                <MainContainer>
                  <Links links={sec[1]?.links} parentSwiper={swiper} />
                </MainContainer>
              </SwiperSlide>
            );
          case "socials":
            return (
              <SwiperSlide key={index}>
                <MainContainer>
                  <Socials socials={sec[1]?.socials} parentSwiper={swiper} />
                </MainContainer>
              </SwiperSlide>
            );
          case "gallery":
            return (
              <SwiperSlide key={index}>
                {index == currentSlide && (
                  <MainContainer>
                    <GallerySlider
                      title="Image Gallery"
                      items={sec[1].images}
                      parentSwiper={swiper}
                    />
                  </MainContainer>
                )}
              </SwiperSlide>
            );
          case "videos":
            return (
              <SwiperSlide key={index}>
                {index == currentSlide && (
                  <MainContainer>
                    <GallerySlider
                      title="Video Gallery"
                      items={sec[1].videos}
                      parentSwiper={swiper}
                    />
                  </MainContainer>
                )}
              </SwiperSlide>
            );

          default:
            return (
              <SwiperSlide key={index}>
                <MainContainer>
                  <Contribute parentSwiper={swiper} />
                </MainContainer>
              </SwiperSlide>
            );
        }
      })}
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
  );
};

export default Sections;

/* 

https://staging.vreel.page/[enterpriseName]/e/[employeeId]
From Aaron Marsh to Everyone 09:39 PM
enterprise(id: "cafb0p223akj9g4qk1ag")
^avangard enterprise id


*/
