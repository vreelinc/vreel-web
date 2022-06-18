import React, { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Styles from "./CommonSlider.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CommonSlider from "./CommonSlider";
import clsx from "clsx";

const CommonSliders: React.FC<{
  data: any;
  children: ReactNode;
}> = ({ data, children }) => {
  return (
    <div className="videoSlider">
      <div className={Styles.video}>
        <div className={Styles.video__container}>
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonSliders;
