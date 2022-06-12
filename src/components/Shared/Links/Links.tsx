import React, { useState } from "react";
import Styles from "./Links.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import clsx from "clsx";
import { LinksData, LinksDataTypes } from "./LinksData";

type Props = {};

const Links = (props: Props) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      loop
      pagination={{
        clickable: true,
      }}
      slidesPerView={1}
      speed={1500}
      autoplay={{
        delay: 1000,
      }}
      // effect='fade'
      className={clsx(Styles.linksContainer)}
    >
      {/* {LinksData.map((item, index) => (
        <SwiperSlide key={index} className={Styles.linksContainer__linksSlides}>
          {Object.values(item).map((obj, index) => (
            <div
              key={index}
              className={Styles.linksContainer__linksSlides__linksSlide}
            >
              <div
                className={
                  Styles.linksContainer__linksSlides__linksSlide__imgContainer
                }
              >
                <img src={obj.image} alt="Links Images" />
              </div>
              <p>{obj.text}</p>
            </div>
          ))}
        </SwiperSlide>
      ))} */}
      {LinksData.map((obj, index) => (
        <SwiperSlide key={index} className={Styles.linksContainer__linksSlides}>
          {obj.map((item: LinksDataTypes, index: number) => (
            <div
              key={index}
              className={Styles.linksContainer__linksSlides__linksSlide}
            >
              <div
                className={
                  Styles.linksContainer__linksSlides__linksSlide__imgContainer
                }
              >
                <img src={item.image} alt="Links Images" />
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Links;
