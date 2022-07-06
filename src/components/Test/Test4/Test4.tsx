import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade, Lazy } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Video from "./Video";

const Test4 = () => {
  // return (
  //   <Swiper
  //     modules={[Navigation, Pagination, Autoplay]}
  //     loop
  //     navigation
  //     pagination={{
  //       clickable: true,
  //     }}
  //     // lazy={true}
  //     onLoad={() => {}}
  //     speed={1000}
  //     // autoplay={{
  //     //   delay: 5000,
  //     // }}

  //     onSlideChange={() => {
  //       console.log('Slide Chnged........');
  //     }}
  //     style={{
  //       height: '100%',
  //       width: '100%',

  //       border: '2px solid green',
  //     }}
  //   >
  //     {[1, 2, 3, 4, 5].map((item, index) => (
  //       <SwiperSlide key={index}>
  //         <Video />
  //       </SwiperSlide>
  //     ))}
  //   </Swiper>
  // );
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop
      navigation
      pagination={{
        clickable: true,
      }}
      // lazy={true}
      onLoad={() => {}}
      speed={1000}
      //   autoplay={{
      //     delay: 5000,
      //   }}
      direction="vertical"
      //   onSwiper={(swiper) => {
      //     setSwiper(swiper);
      //   }}
      // effect='fade'
      //   className={clsx(Styles.vreelSlider)}

      style={{ width: "100vw", height: "100vh", border: "1px solid red" }}
    >
      <SwiperSlide>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "white",
            color: "black",
            border: "2px solid green",
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            navigation
            pagination={{
              clickable: true,
            }}
            // lazy={true}
            onLoad={() => {}}
            speed={1000}
            // autoplay={{
            //   delay: 5000,
            // }}

            onSlideChange={() => {
              console.log("Slide Chnged........");
            }}
            style={{
              height: "100%",
              width: "100%",

              border: "2px solid green",
            }}
          >
            {[1, 2, 3, 4, 5].map((item, index) => (
              <SwiperSlide key={index}>
                <Video />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "white",
            color: "black",
            border: "2px solid blue",
          }}
        >
          Slide -2
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "white",
            color: "black",
            border: "2px solid violet",
          }}
        >
          Slide -3
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "white",
            color: "black",
            border: "2px solid gray",
          }}
        >
          Slide -4
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Test4;
