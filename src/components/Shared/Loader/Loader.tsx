import clsx from "clsx";
import React from "react";
import { Audio } from "react-loader-spinner";
import Styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={Styles.loaderContainer}>
      <Audio height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
};
