import React from "react";
import Styles from "./BottomSheetButton.module.scss";

const BottomSheetButton: React.FC<{ setOpen: Function; title: string }> = ({
  setOpen,
  title,
}) => {
  return (
    <div className={Styles.buttonContainer}>
      <p>{title}</p>
      <button onClick={() => setOpen(true)}></button>
    </div>
  );
};

export default BottomSheetButton;
