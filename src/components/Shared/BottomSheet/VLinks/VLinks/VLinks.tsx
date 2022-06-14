import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  openSocials,
  openVLinks,
} from "src/redux/createSlice/bottomSheetSlice";
import { RootState } from "src/redux/store/store";
import BottomSheetButton from "../../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import VLinksReadModal from "../VLinksReadModal/VLinksReadModal";
import Styles from "./VLinks.module.scss";
import VLinksCommon from "../VLinks/VLinksCommon";
import { VLinksData } from "./VLinksData";
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
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: "hasan",
    },
  });

  return (
    <div className={Styles.vLinksContainer}>
      <BottomSheetBtnTop title="VLinks" actions={openVLinks} />
      {data?.username.vreel.elements.super_links.map((item, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
      <BottomSheetButton actions={openSocials} title="Socials" />
    </div>
  );
};

export default VLinks;
