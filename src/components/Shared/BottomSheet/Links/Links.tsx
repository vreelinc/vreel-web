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
import Link from "next/link";

const Links: React.FC<{ parentSwiper: any; links: any }> = ({
  parentSwiper,
  links,
}) => {
  const { height, width } = useWindowDimensions();
  // console.log({ links });

  const Data = useGroupData(links, height < 500 ? 4 : 6);
  // const tags = Array.from(new Set(links.map((e: any) => e.tag)));
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
                  <Link href={item.url}>
                    <a target="_blank">
                      <h3>{item.link_header}</h3>
                    </a>
                  </Link>
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
