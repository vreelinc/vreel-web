import React from "react";
import Styles from "./BottomSheetBtnBottom.module.scss";
import { HiOutlineMenu } from "react-icons/hi";

const BottomSheetButton: React.FC<{
  setOpen: Function;
  title: string;
}> = ({ setOpen, title }) => {
  return (
    <div className={Styles.buttonContainer} onClick={() => setOpen(true)}>
      <p>{title}</p>
      <button></button>
    </div>
  );
};

export default BottomSheetButton;
