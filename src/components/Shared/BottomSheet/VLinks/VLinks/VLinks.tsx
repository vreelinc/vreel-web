import clsx from "clsx";
import React from "react";
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
import VLinksCommon from "./VLinksCommon";
import { VLinksData } from "./VLinksData";

const VLinks = () => {
  return (
    <div className={Styles.vLinksContainer}>
      <BottomSheetBtnTop title="VLinks" actions={openVLinks} />
      {VLinksData.map((item, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
      <BottomSheetButton actions={openSocials} title="Socials" />
    </div>
  );
};

export default VLinks;
