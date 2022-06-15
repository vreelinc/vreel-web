import React from "react";
import Styles from "../BottomSheetBtnBottom/BottomSheetBtnBottom.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch } from "src/redux/store/store";

const BottomSheetBtnTop: React.FC<{
  title: string;
  actions: Function;
}> = ({ title, actions }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={Styles.buttonTopContainer}>
      <p>{title}</p>
      <button onClick={() => dispatch(actions(false))}></button>
      <HiOutlineMenu className={Styles.buttonTopContainer__menu} />
    </div>
  );
};

export default BottomSheetBtnTop;
