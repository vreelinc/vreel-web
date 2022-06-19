import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Links from "src/components/Shared/BottomSheet/Links/Links";
import VLinks from "src/components/Shared/BottomSheet/VLinks/VLinks/VLinks";
import Events from "src/components/Shared/BottomSheet/Events/Events";
import Socials from "src/components/Shared/BottomSheet/Socials/Socials";
import Contribute from "src/components/Shared/BottomSheet/Contribute/Contribute";
import MusicLinks from "src/components/Shared/BottomSheet/MusicLinks/MusicLinks";
import VideosSlider from "src/components/Shared/BottomSheet/VideosSlider/VideosSlider";
import ImagesSlider from "src/components/Shared/BottomSheet/ImgesSlider/ImagesSlider";
import BottomSheetContainer from "src/components/Shared/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import VreelSlider from "src/components/VreelSlider/VreelSlider";

import { useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_USER_NAME } from "src/components/graphql/query";
import { useQuery } from "@apollo/client";

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(null);
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: "/",
    },
  });
  /* const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: { username: "sagor" },
  });

  if (loading) {
    return <Loader />;
  }

  data?.username?.vreel?.slides.map((D) => {
    console.log(D.desktop);
  });
  
 */
  const nextSlide = useSwiper();
  return (
    <Swiper
      modules={[Pagination, Autoplay, Mousewheel, Navigation]}
      slidesPerView={1}
      mousewheel={true}
      direction={"vertical"}
      style={{ height: "100vh" }}
      onSwiper={(swiper) => {
        console.log({ swiper });
      }}
    >
      {/*   <SwiperSlide>
        <VreelSlider view="Mobile" nextSlide={nextSlide} />
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
      <SwiperSlide>
        <VideosSlider />
      </SwiperSlide>
      <SwiperSlide>
        <ImagesSlider />
      </SwiperSlide> */}
    </Swiper>
  );
}
