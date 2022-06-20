import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VreelSlider from "src/components/VreelSlider/VreelSlider";
import Links from "../Links/Links";
import VLinks from "../VLinks/VLinks/VLinks";
import Events from "../Events/Events";
import Socials from "../Socials/Socials";
import Contribute from "../Contribute/Contribute";
import MusicLinks from "../MusicLinks/MusicLinks";
import VideosSlider from "../VideosSlider/VideosSlider";
import ImagesSlider from "../ImgesSlider/ImagesSlider";

const BottomSheetSlide: React.FC<{ data: any }> = ({ data }) => {
  const [swiper, setSwiper] = useState(null);
  const {
    username: {
      vreel: { elements, slides },
    },
  } = data;
  console.log({ elements, slides });

  return (
    <Swiper
      modules={[Pagination, Autoplay, Mousewheel, Navigation]}
      slidesPerView={1}
      mousewheel={true}
      speed={1000}
      direction={"vertical"}
      style={{ height: "100vh" }}
      onSwiper={(swiper) => {
        setSwiper(swiper);
      }}
    >
      <SwiperSlide>
        <VreelSlider data={data} view="Mobile" parentSwiper={swiper} />
      </SwiperSlide>
      {elements.simple_links && (
        <SwiperSlide>
          <Links links={elements.simple_links.links} parentSwiper={swiper} />
        </SwiperSlide>
      )}
      {/* <SwiperSlide>
        <VLinks parentSwiper={swiper} />
      </SwiperSlide> */}
      {/* <SwiperSlide>
        <Events parentSwiper={swiper} />
      </SwiperSlide> */}
      {elements.socials && (
        <SwiperSlide>
          <Socials socials={elements.socials.socials} parentSwiper={swiper} />
        </SwiperSlide>
      )}
      {/* <SwiperSlide>
        <Contribute parentSwiper={swiper} />
      </SwiperSlide>
      <SwiperSlide>
        <MusicLinks parentSwiper={swiper} />
      </SwiperSlide> */}
      {/* <SwiperSlide>
        <VideosSlider parentSwiper={swiper} />
      </SwiperSlide>
      <SwiperSlide>
        <ImagesSlider />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default BottomSheetSlide;
