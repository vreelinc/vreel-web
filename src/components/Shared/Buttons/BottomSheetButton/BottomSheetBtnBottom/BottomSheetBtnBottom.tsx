import React from "react";
import Styles from "./BottomSheetBtnBottom.module.scss";
import { useAppDispatch } from "src/redux/store/store";

const BottomSheetButton: React.FC<{
  actions: Function;
  title?: string;
}> = ({ actions, title }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={Styles.buttonContainer}
      onClick={() => dispatch(actions(true))}
    >
      <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
    </button>
  );
};

export default BottomSheetButton;
