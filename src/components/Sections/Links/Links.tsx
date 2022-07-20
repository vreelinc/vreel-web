import React, { useRef, useState } from "react";
import Styles from "./Links.module.scss";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { useGroupData } from "src/hooks/useGroupData";
import SectionContainer from "../SectionContainer/SectionContainer";
import Link from "next/link";
import SwiperContainer from "@shared/SwiperContainer/SwiperContainer";

const Links: React.FC<{ parentSwiper: any; links: any }> = ({
  parentSwiper,
  links,
}) => {
  const { height, width } = useWindowDimensions();
  // console.log({ links });

  const Data = useGroupData(links, height < 500 ? 4 : 6);
  // const tags = Array.from(new Set(links.map((e: any) => e.tag)));
  return (
    <SectionContainer title="Links" parentSwiper={parentSwiper}>
      {/* <div className={clsx("sheetSlider", Styles.LinksContainer)}> */}
      {/* <div className={Styles.filter}>
          {["all", ...tags].map((e: string, index: number) => (
            <span
              key={index}
              onClick={() => setfiler(e)}
              className={Styles.filter__item}
              style={{
                borderBottom: e == filter ? "1px solid white" : "",
              }}
            >
              {e}
            </span>
          ))}
        </div> */}
      <SwiperContainer>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide key={index}>
            <div className={Styles.LinksContainer}>
              {obj.map((item: any, index: number) => (
                <div key={index} className={Styles.LinksContainer__LinksSlide}>
                  <Link href={item.url}>
                    <a target="_blank">
                      <div
                        className={
                          Styles.LinksContainer__LinksSlide__imgContent
                        }
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: "0",
                            left: "0",
                          }}
                        ></div>
                        <img src={item.thumbnail} alt="Links Images" />
                      </div>
                    </a>
                  </Link>
                  <div
                    className={Styles.LinksContainer__LinksSlide__textContent}
                  >
                    <Link href={item.url}>
                      <a target="_blank">
                        <p>{item.link_header}</p>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </SwiperContainer>
      {/* </div> */}
    </SectionContainer>
  );
};

export default Links;
