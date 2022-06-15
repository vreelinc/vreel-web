import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  openSocials,
  openVLinks,
} from "src/redux/createSlice/bottomSheetSlice";
import BottomSheetButton from "../../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import Styles from "./VLinks.module.scss";
import VLinksCommon from "../VLinks/VLinksCommon";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import { useGroupData } from "src/hooks/useGroupData";
import SwiperSheet from "../../SwiperSheet/SwiperSheet";
import { SwiperSlide } from "swiper/react";

const GET_LINKS = gql`
  query User($Username: String) {
    username(username: $Username) {
      username
      vreel {
        author
        elements {
          super_links {
            id
            thumbnail
            link_header
            link_sub_header
            url
            description
            link_type
          }
        }
      }
    }
  }
`;
const VLinks: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  const router = useRouter();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: username,
    },
  });
  const vLinksData = data?.username.vreel.elements.super_links;
  const { height } = useWindowDimensions();
  const Data = useGroupData(vLinksData, height < 500 ? 2 : 3);

  console.log({ Data });

  if (loading) return null;
  return (
    <div className={Styles.vLinksContainer}>
      <BottomSheetBtnTop title="VLinks" actions={openVLinks} />
      <SwiperSheet>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide key={index} className={Styles.vLinksContainer__slide}>
            {obj.map((item: any, index: number) => (
              <VLinksCommon item={item} index={index} key={index} />
            ))}
          </SwiperSlide>
        ))}
      </SwiperSheet>
      <BottomSheetButton actions={openSocials} title="Socials" />
    </div>
  );
};

export default VLinks;
