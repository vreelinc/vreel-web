import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import Styles from "./MenuCloseBtn.module.scss";

const MenuCollapse: React.FC<{ action: Function }> = ({ action }) => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.menuCloseBtn} onClick={() => dispatch(action())}>
      <IoIosCloseCircleOutline className={Styles.closeIcon} />
    </div>
  );
};

export default MenuCollapse;
