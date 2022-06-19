import React, { useRef, useState } from "react";
import Styles from "./Links.module.scss";

import clsx from "clsx";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  openBottomSheet,
  openVLinks,
} from "src/redux/createSlice/bottomSheetSlice";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

import { LinksDataTypes } from "../../Types/BottomSheetDataTypes";
import { useGroupData } from "src/hooks/useGroupData";
import BottomSheetContainer from "../BottomSheetContainer/BottomSheetContainer";

const GET_LINKS = gql`
  query User($Username: String) {
    username(username: $Username) {
      username
      vreel {
        author
        elements {
          simple_links {
            header
            links {
              id
              position
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
  }
`;
const Links = ({ parentSwiper }) => {
  const router = useRouter();
  const { username } = router?.query;
  const [filter, setfiler] = useState("all");
  const { height, width } = useWindowDimensions();

  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: username,
    },
  });

  const LinksData: Array<LinksDataTypes>[] =
    data?.username.vreel.elements.simple_links.links.filter((e: any) =>
      filter == "all" ? true : filter == e.tag
    );
  const Data = useGroupData(LinksData, height < 500 ? 4 : 6);
  console.log({ Data });
  const tags = Array.from(
    new Set(
      data?.username.vreel.elements.simple_links.links.map((e: any) => e.tag)
    )
  );

  if (loading) return null;
  return (
    <BottomSheetContainer title="Links" parentSwiper={parentSwiper}>
      <div className={clsx("sheetSlider", Styles.LinksContainer)}>
        {/* <div className={Styles.LinksContainer__filter}>
          {["all", ...tags].map((e: string, index: number) => (
            <span
              key={index}
              onClick={() => setfiler(e)}
              className={Styles.LinksContainer__filter__item}
              style={{
                borderBottom: e == filter ? "1px solid white" : "",
              }}
            >
              {e}
            </span>
          ))}
        </div> */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          speed={1500}
          // effect='fade'
        >
          {Data.map((obj: any, index: number) => (
            <SwiperSlide
              key={index}
              className={clsx(Styles.LinksContainer__LinksSlides)}
            >
              {obj.map((item: any, index: number) => (
                <div
                  key={index}
                  className={Styles.LinksContainer__LinksSlides__LinksSlide}
                >
                  <div
                    className={
                      Styles.LinksContainer__LinksSlides__LinksSlide__imgContainer
                    }
                  >
                    <img src={item.thumbnail} alt="Links Images" />
                  </div>
                  <h3>{item.link_header}</h3>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </BottomSheetContainer>
  );
};

export default Links;
