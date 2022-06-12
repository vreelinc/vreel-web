import React from "react";
import Styles from "../BottomSheetBtnBottom/BottomSheetBtnBottom.module.scss";
import { HiOutlineMenu } from "react-icons/hi";

const BottomSheetBtnTop: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div className={Styles.buttonTopContainer}>
      <p>{title}</p>
      <button></button>
      <HiOutlineMenu className={Styles.buttonTopContainer__menu} />
    </div>
  );
};

export default BottomSheetBtnTop;
