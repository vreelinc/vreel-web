import React, { useRef, useState } from "react";
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
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";

const Links: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  return (
    <div className={clsx(Styles.linksContainer)}>
      <BottomSheetBtnTop title="Links" />
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        speed={1500}
        // effect='fade'
      >
        {LinksData.map((obj, index) => (
          <SwiperSlide
            key={index}
            className={Styles.linksContainer__linksSlides}
          >
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
      <BottomSheetButton setOpen={setOpen} title="VLinks" />
    </div>
  );
};

export default Links;
