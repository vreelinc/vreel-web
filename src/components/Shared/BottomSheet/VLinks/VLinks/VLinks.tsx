import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import BottomSheetButton from "../../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import VLinksReadModal from "../VLinksReadModal/VLinksReadModal";
import Styles from "./VLinks.module.scss";
import VLinksCommon from "./VLinksCommon";
import { VLinksData } from "./VLinksData";

const VLinks: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  return (
    <div className={Styles.vLinksContainer}>
      <BottomSheetBtnTop title="VLinks" />
      {VLinksData.map((item, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
      <BottomSheetButton setOpen={setOpen} title="Socials" />
    </div>
  );
};

export default VLinks;
