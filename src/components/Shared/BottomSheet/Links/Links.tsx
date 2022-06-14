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
import { LinksDataTypes } from "./LinksData";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
const GET_LINKS = gql`
  query User($Username: String) {
    username(username: $Username) {
      username
      vreel {
        author
        elements {
          simple_links {
            id
            thumbnail
            link_header
            url
            link_type
            tag
          }
        }
      }
    }
  }
`;
const Links: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  const router = useRouter();
  const { username } = router?.query;
  const [filter, setfiler] = useState("all");
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: username,
    },
  });
  console.log({ data: data?.username.vreel.elements.simple_links });
  const LinksData: Array<LinksDataTypes>[] = [];
  const size = 6;
  data?.username.vreel.elements.simple_links
    .filter((e) => (filter == "all" ? true : filter == e.tag))
    .forEach((item) => {
      if (
        !LinksData.length ||
        LinksData[LinksData.length - 1].length === size
      ) {
        LinksData.push([]);
      }
      LinksData[LinksData.length - 1].push(item);
    });
  const tags = Array.from(
    new Set(data?.username.vreel.elements.simple_links.map((e) => e.tag))
  );
  console.log({ tags });

  return (
    <div className={clsx(Styles.linksContainer)}>
      <BottomSheetBtnTop title="Links" />
      <div
        className={Styles.linksContainer__filter}
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        {["all", ...tags].map((e: string) => (
          <span
            onClick={() => setfiler(e)}
            style={{
              padding: "0 5px 0 0",
              cursor: "pointer",
              textTransform: "capitalize",
              borderBottom: e == filter ? "1px solid white" : "",
            }}
          >
            {e}
          </span>
        ))}
      </div>
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
                  <img src={item.thumbnail} alt="Links Images" />
                </div>
                <p>{item.link_header}</p>
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
