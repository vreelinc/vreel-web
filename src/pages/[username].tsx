import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GET_USER_BY_USER_NAME } from "src/components/graphql/query";
import VreelSlider from "../components/VreelSlider/VreelSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel } from "swiper";
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

const userPage = () => {
  const router = useRouter();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: username,
    },
  });

  console.log({ data, username });
  if (loading || error) return <div>Loading...</div>;
  if (!data) {
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>{`${username}'s`} VReel</title>
      </Head>
      <Swiper
        modules={[Pagination, Autoplay, Mousewheel]}
        slidesPerView={1}
        mousewheel={true}
        direction={"vertical"}
        style={{ height: "100vh" }}
      >
        <SwiperSlide>
          <VreelSlider view="Mobile" />
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
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default userPage;
