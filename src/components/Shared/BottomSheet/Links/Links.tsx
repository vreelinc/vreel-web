import React, { useRef, useState } from "react";
import Styles from "./Links.module.scss";

import clsx from "clsx";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Loader } from "src/components/common/Loader/Loader";
import {
  openBottomSheet,
  openVLinks,
} from "src/redux/createSlice/bottomSheetSlice";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

import { LinksDataTypes } from "../../Types/BottomSheetDataTypes";
import { useGroupData } from "src/hooks/useGroupData";
import SwiperSheet from "../SwiperSheet/SwiperSheet";
import { SwiperSlide } from "swiper/react";
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
const Links = () => {
  const router = useRouter();
  const { username } = router?.query;
  const [filter, setfiler] = useState("all");
  const { height } = useWindowDimensions();

  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: username,
    },
  });

  const LinksData: Array<LinksDataTypes>[] =
    data?.username.vreel.elements.simple_links.filter((e: any) =>
      filter == "all" ? true : filter == e.tag
    );
  const Data = useGroupData(LinksData, height > 450 && height < 500 ? 4 : 6);
  const tags = Array.from(
    new Set(data?.username.vreel.elements.simple_links.map((e: any) => e.tag))
  );

  if (loading) return null;
  return (
    <div className={clsx(Styles.LinksContainer)}>
      <BottomSheetBtnTop title="Links" actions={openBottomSheet} />
      <div className={Styles.LinksContainer__filter}>
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
      </div>
      <SwiperSheet>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide
            key={index}
            className={Styles.swiperSheet__swiperSheetSlides}
          >
            {obj.map((item: any, index: number) => (
              <div
                key={index}
                className={
                  Styles.swiperSheet__swiperSheetSlides__swiperSheetSlide
                }
              >
                <div
                  className={
                    Styles.swiperSheet__swiperSheetSlides__swiperSheetSlide__imgContainer
                  }
                >
                  <img src={item.thumbnail} alt="Links Images" />
                </div>
                <p>{item.link_header}</p>
              </div>
            ))}
          </SwiperSlide>
        ))}
      </SwiperSheet>
      <BottomSheetButton actions={openVLinks} title="VLinks" />
    </div>
  );
};

export default Links;
