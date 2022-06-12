import clsx from "clsx";
import React from "react";
import Styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div>
      <div className={Styles.loader}></div>
      <h1 className={Styles.loader_header}> VReel</h1>
    </div>
  );
};
