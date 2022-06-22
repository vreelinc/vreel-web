import clsx from "clsx";
import React from "react";
import {
  Audio,
  BallTriangle,
  Circles,
  Oval,
  Rings,
  TailSpin,
  ThreeDots,
} from "react-loader-spinner";
import Styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={Styles.loaderContainer}>
      <Circles color="#00BFFF" height={80} width={80} />
    </div>
  );
};
