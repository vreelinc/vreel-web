import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import VreelSlider from "../VreelSlider/VreelSlider";
import Styles from "./MobilePreview.module.scss";

const MobilePreview = () => {
  return (
    <div className={Styles.showMobilePreview}>
      {/* {mediaSlidePreviewLink.link.length ? (
        <div className={Styles.showMobilePreview__bgImg}>
          <img src={mediaSlidePreviewLink.link} alt="Slides Images" />
        </div>
      ) : (
        <div className={Styles.showMobilePreview__text}>
          <h3>Preview</h3>
        </div>
      )} */}
      <VreelSlider view="Mobile" />
    </div>
  );
};

export default MobilePreview;
