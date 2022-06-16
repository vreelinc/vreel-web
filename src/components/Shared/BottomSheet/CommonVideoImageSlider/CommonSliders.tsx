import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Styles from "./CommonSlider.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CommonSlider from "./CommonSlider";
import clsx from "clsx";
import { openImages } from "src/redux/createSlice/bottomSheetSlice";
import BottomSheetBtnBottom from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";

const CommonSliders: React.FC<{ data: any; actions: Function }> = ({
  data,
  actions,
}) => {
  return (
    <div className="videoSlider">
      <div className={Styles.video}>
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          speed={1500}
          className={clsx(Styles.vreelSlider, Styles.vreelSlider_mobile)}
        >
          {data.map((item, index: number) => (
            <SwiperSlide key={index} className={Styles.vreelSlide}>
              <CommonSlider item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <BottomSheetBtnBottom actions={actions} />
      </div>
    </div>
  );
};

export default CommonSliders;
