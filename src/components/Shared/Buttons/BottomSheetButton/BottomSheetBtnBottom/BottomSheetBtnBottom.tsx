import React from "react";
import Styles from "./BottomSheetBtnBottom.module.scss";
import { useAppDispatch } from "src/redux/store/store";

const BottomSheetButton: React.FC<{
  openActions: Function;
  closeActions: Function;
}> = ({ openActions, closeActions }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={Styles.buttonContainer}
      onClick={() => {
        dispatch(openActions(true));
        dispatch(closeActions(false));
      }}
    >
      <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
    </button>
  );
};

export default BottomSheetButton;
