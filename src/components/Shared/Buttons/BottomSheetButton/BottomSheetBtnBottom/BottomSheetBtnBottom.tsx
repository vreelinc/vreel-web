import React from "react";
import Styles from "./BottomSheetBtnBottom.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch } from "src/redux/store/store";

const BottomSheetButton: React.FC<{
  actions: Function;
  title: string;
}> = ({ actions, title }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={Styles.buttonContainer}
      onClick={() => dispatch(actions(true))}
    >
      <p>{title}</p>
      <button></button>
    </div>
  );
};

export default BottomSheetButton;
