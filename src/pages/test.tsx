import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Mousewheel } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VreelSlider from "src/components/VreelSlider/VreelSlider";
import Links from "src/components/Shared/BottomSheet/Links/Links";
import VLinks from "src/components/Shared/BottomSheet/VLinks/VLinks/VLinks";
import Events from "src/components/Shared/BottomSheet/Events/Events";
import Socials from "src/components/Shared/BottomSheet/Socials/Socials";
import Contribute from "src/components/Shared/BottomSheet/Contribute/Contribute";
import MusicLinks from "src/components/Shared/BottomSheet/MusicLinks/MusicLinks";

export default function test() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, Mousewheel]}
      pagination={{
        clickable: true,
      }}
      slidesPerView={1}
      mousewheel={true}
      direction={"vertical"}
      style={{ height: "100vh" }}
    >
      <SwiperSlide>
        <VreelSlider view="Desktop" />
      </SwiperSlide>
      <SwiperSlide>
        <Links />
      </SwiperSlide>
      <SwiperSlide>
        <VLinks />
      </SwiperSlide>
      <SwiperSlide>
        <Events />
      </SwiperSlide>
      <SwiperSlide>
        <Socials />
      </SwiperSlide>
      <SwiperSlide>
        <Contribute />
      </SwiperSlide>
      <SwiperSlide>
        <MusicLinks />
      </SwiperSlide>
    </Swiper>
  );
}

// https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx
{
  /* <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          style={{ height: "100vh" }}
        >
          <SwiperSlide></SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper> */
}
