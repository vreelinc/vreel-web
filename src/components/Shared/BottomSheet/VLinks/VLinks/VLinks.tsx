import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "./VLinks.module.scss";
import VLinksCommon from "../VLinks/VLinksCommon";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import { useGroupData } from "src/hooks/useGroupData";
import SwiperSheet from "../../SwiperSheet/SwiperSheet";
import { SwiperSlide } from "swiper/react";
import VLinksReadModal from "../VLinksReadModal/VLinksReadModal";
import BottomSheetContainer from "../../BottomSheetContainer/BottomSheetContainer";

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
const VLinks = ({ parentSwiper }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: username,
    },
  });
  const { height, width } = useWindowDimensions();
  const vLinksData = data?.username.vreel.elements.super_links;
  const Data = useGroupData(
    vLinksData,
    height < 500 ? 2 : width < 1025 ? 3 : 4
  );

  if (loading) return null;
  return (
    <BottomSheetContainer title="VLinks" parentSwiper={parentSwiper}>
      <div className={Styles.container}>
        {open && <VLinksReadModal open={open} setOpen={setOpen} />}
        <SwiperSheet>
          {Data.map((obj: any, index: number) => (
            <SwiperSlide
              key={index}
              className={Styles.vLinksContainer__container__slide}
            >
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
      </div>
    </BottomSheetContainer>
  );
};

export default VLinks;
