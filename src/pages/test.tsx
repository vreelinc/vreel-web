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
import Styles from "./test.module.scss";
import BottomSheetContainer from "src/components/Shared/BottomSheet/BottomSheetContainer/BottomSheetContainer";

export default function test() {
  return (
    <BottomSheetContainer title="Container">
      <main className={Styles.gridContainer}></main>
    </BottomSheetContainer>
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
