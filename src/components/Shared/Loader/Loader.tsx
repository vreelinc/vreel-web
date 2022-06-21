import clsx from "clsx";
import React from "react";
import Styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={Styles.loaderContainer}>
      <div className={Styles.loaderContainer__loader}></div>
      <h1 className={Styles.loaderContainer__loader_header}> VReel</h1>
    </div>
  );
};
