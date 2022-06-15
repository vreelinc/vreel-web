import React from "react";
import Styles from "./SwiperSheet.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperSheet: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="sheetSlider">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        speed={1500}
        // effect='fade'
        className={Styles.swiperSheet}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperSheet;
