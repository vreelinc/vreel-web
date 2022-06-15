import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
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
import { RootState } from "src/redux/store/store";
import VLinksReadModal from "../VLinksReadModal/VLinksReadModal";

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
const VLinks = () => {
  const { height } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: "hasan",
    },
  });
  const vLinksData = data?.username.vreel.elements.super_links;
  const Data = useGroupData(vLinksData, height < 500 ? 2 : 3);

  if (loading) return null;
  return (
    <div className={Styles.vLinksContainer}>
      {open && <VLinksReadModal open={open} setOpen={setOpen} />}
      <BottomSheetBtnTop title="VLinks" actions={openVLinks} />
      <SwiperSheet>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide key={index} className={Styles.vLinksContainer__slide}>
            {obj.map((item: any, index: number) => (
              <VLinksCommon
                item={item}
                index={index}
                key={index}
                open={open}
                setOpen={setOpen}
              />
            ))}
          </SwiperSlide>
        ))}
      </SwiperSheet>
      <BottomSheetButton actions={openSocials} title="Socials" />
    </div>
  );
};

export default VLinks;
